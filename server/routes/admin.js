import express from 'express';
import jwt from 'jsonwebtoken';
import google from 'googleapis';
import nconf from 'nconf';
import path from 'path';
import fs from 'fs';
import csv from 'csv';
import robin from 'roundrobin';
import moment from 'moment';

import config from '../config';
import {getTeams, createTeams, createMatches, resetTournament} from '../db/team';
import {authenticateAdmin, isAuthenticatedAdmin} from '../auth/adminAuth';

import {writeTeams, writeMatches} from '../tournament-export';

let OAuth2Client = google.auth.OAuth2;

let CLIENT_ID = config.google.client_id;
let CLIENT_SECRET = config.google.client_secret;
let REDIRECT_URL = 'http://localhost:8080/oauth2callback';

let oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

let credentials = {
    access_token: config.google.access_token,
    token_type: 'Bearer',
    refresh_token: config.google.refresh_token
};
oauth2Client.setCredentials(credentials);

let fileId = config.google.file_id;
let drive = google.drive({version: 'v3', auth: oauth2Client});

var send = require('gmail-send')({
  user: 'lerkendalinvitational@gmail.com',
  pass: process.env.GMAIL_PASS,
  to:   'lerkendalinvitational@gmail.com',
  subject: '[Autogenerert] Turneringsoppsett - backup',
  text:    'Hei!\n Vedlagt ligger lag og kamper. \n\n'
});

const adminRouter = express.Router();
export default adminRouter;

adminRouter.post('/authenticate', authenticateAdmin, (req, res) => {
    res.status(200).send(JSON.stringify({token: req.token}));
});

adminRouter.get('/reset', isAuthenticatedAdmin, async (req, res) => {
    console.log("/costume");
    try {
        let status = await getAndWriteTournament();
        let deleteSuccess = await resetTournament();
        let teams = await readTeams();
        calculateGroups(teams);
        await createTeams(teams);
        teams = await getTeams();
        let matches = generateMatches(teams);
        await createMatches(matches);

        console.log("success");
        res.status(200).send(JSON.stringify({success: true}));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

adminRouter.get('/backup', isAuthenticatedAdmin, async (req, res) => {
    try {
        let teamsStatus = await writeTeams();
        let matchesStauts = await writeMatches();
        console.log("teams and matches written ");
        send({
            files: [
                {
                    path: './matches.csv'
                }, {
                    path: './teams.csv'
                }
            ]
        }, (err, res2) => {
            if(err) {
                console.log(true);
                console.log(err);
                res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
            } else {
                console.log(false);
                res.status(200).send(JSON.stringify({success: true}));
            }
            console.log('* [example 1.2] send() callback returned: err:', err, '; res:', res2);
        });
    } catch(e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

// Google drive fileID for the spreadsheets with teams
function getAndWriteTournament() {
    return new Promise((resolve, reject) => {
        drive.files.export({
            fileId: fileId,
            mimeType: 'text/csv'
        }, (err, res) => {
            if (err) {
                console.log('Error:', err);
                reject(err);
            }
            console.log('Received %d bytes', res.data.length);
            console.log('Type of res:', typeof res);
            fs.writeFileSync('./lerkendalinvitational.csv', res.data);
            resolve("Success");
        });
    });
}

function readTeams() {
    return new Promise((resolve, reject) => {
        let teams = []
        fs.readFile('./lerkendalinvitational.csv', (err, data) => {
            if (err)
                reject(err);
            csv.parse(data, (err, data) => {
                if (err)
                    reject(err);

                // Remove first 2 lines
                data = data.slice(2);
                for (let i = 0; i < 48; i++){
                    let row = data[i];
                    console.log(row[0]);
                    teams.push({teamname: row[0], member1: row[1], member2: row[2], email: row[3]});
                }

                // This is just to fill so we get 48 teams
                for(let i = teams.length; i < 48; i++) {
                    console.log("pushing fill team");
                    teams.push({
                        teamname: `Fill team ${i}`,
                        member1: "Member1",
                        member2: "member2",
                        email: `fillemail${i}@gmail.com`
                     });
                }
                resolve(teams);
            });
        });
    });
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function calculateGroups(teams) {
    // console.log(teams.length);
    teams = shuffle(teams);
    let n_groups = 8;
    teams.forEach((team, index) => {
        team.group_number = index % n_groups;
    });
    return teams;
}

function generateMatches(teams){
    console.log("LENGTH IS", teams.length);
    let matches = [];
    let groups = [...(new Set(teams.map(team => team.group_number)))].sort();
    let deltaMinutes = 20;

    let tournamentStart = new Date('February 24, 2018 16:00');

    for(var group of groups){
        let matchStart = new Date(tournamentStart);
        let groupTeams = teams.filter(team => team.group_number == group);
        let matchIndices = robin(groupTeams.length);

        for(let round of matchIndices){
            for(let matchIndex of round) {
                matches.push({
                    team1_id: groupTeams[matchIndex[0] - 1].id,
                    team2_id: groupTeams[matchIndex[1] - 1].id,
                    table_number: Number(group),
                    start_time: matchStart
                });
                matchStart = moment(matchStart).add(20, 'm').toDate();
            }
        }
    }
    return matches;
}

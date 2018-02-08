import nconf from 'nconf';
import path from 'path';
import fs from 'fs';
import csv from 'csv';
import robin from 'roundrobin';
import moment from 'moment';

import {getTeams, createTeams, createMatches, resetTournament} from '../db/team';

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
                data = data.slice(2)
                for (let row of data) {
                    teams.push({teamname: row[0], member1: row[1], member2: row[2], email: row[3]});
                }

                // This is just to fill so we get 48 teams
                for(let i = teams.length; i < 48; i++) {
                    console.log("pushing");
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

// googleAPIRouter.post('/createtournament', async (req, res) => {
export async function testfunc() {
    try {
        let deleteSuccess = await resetTournament();
        let teams = await readTeams();
        calculateGroups(teams);
        await createTeams(teams);

        teams = await getTeams();
        let matches = generateMatches(teams);
        await createMatches(matches);
        console.log("success");
    } catch (e) {
        console.log(e);
        // res.status(500).send(JSON.stringify({error: "Noe gikk galt"}));
    }
    // });
}
// testfunc();

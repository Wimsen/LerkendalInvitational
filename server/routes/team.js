import express from 'express';

import {getTeams, getTeam, getMatches, getMatchesByTeamId, registerMatchResult} from '../db/team';
import {isAuthenticated} from '../auth/userAuth';

const teamRouter = express.Router();
export default teamRouter;
teamRouter.use(isAuthenticated);

teamRouter.get('/teams', async (req, res) => {
    let teams = await getTeams();
    res.status(200).send(JSON.stringify(teams));
});

teamRouter.get('/team/:id', async (req, res) => {
    let teamId = req.params.id;
    let team = await getTeam(teamId);
    console.log(team);
    res.status(200).send(JSON.stringify(team));
});

teamRouter.get('/matches', async (req, res) => {
    let matches = await getMatches();
    console.log("matches");
    res.status(200).send(JSON.stringify(matches));
});

teamRouter.get('/matches/team/:id', async (req, res) => {
    console.log("here it is ");
    let teamId = req.params.id;
    let matches = await getMatchesByTeamId(teamId);
    // console.log(matches);
    res.status(200).send(JSON.stringify(matches));
});

teamRouter.post('/matches', async (req, res) => {
    if (!req.body.matchId || !req.body.winnerId || !req.body.loserId) {
        res.status(400).send(JSON.stringify({message: "Missing required ids"}));
        return;
    }
    // console.log(req.body);

    try{
        let status = await registerMatchResult(req.body.matchId, req.body.winnerId, req.body.loserId);
        res.status(200).send(JSON.stringify({success: "true"}));
    } catch(e) {
        res.status(500).send(JSON.stringify({success: "false"}));
    }
});

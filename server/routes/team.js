import express from 'express';

import {getTeams, getTeam, getMatches, getMatchesByTeamId} from '../db/team';
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

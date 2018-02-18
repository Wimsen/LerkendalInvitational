import express from 'express';

import {getTeams, getTeam, getMatches, getMatchesByTeamId, registerMatchResult} from '../db/team';
import {isAuthenticated} from '../auth/userAuth';

const teamRouter = express.Router();
export default teamRouter;
teamRouter.use(isAuthenticated);

teamRouter.get('/', async (req, res) => {
    let teams = await getTeams();
    res.status(200).send(JSON.stringify(teams));
});

teamRouter.get('/:id', async (req, res) => {
    let teamId = req.params.id;
    let team = await getTeam(teamId);
    console.log(team);
    res.status(200).send(JSON.stringify(team));
});

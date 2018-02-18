import express from 'express';

import {getTeams, getTeam, getMatches, getMatchesByTeamId, registerMatchResult} from '../db/team';
import {isAuthenticated} from '../auth/userAuth';

const matchesRouter = express.Router();
export default matchesRouter;
matchesRouter.use(isAuthenticated);

matchesRouter.get('/', async (req, res) => {
    let matches = await getMatches();
    console.log("matches");
    res.status(200).send(JSON.stringify(matches));
});

matchesRouter.get('/team/:id', async (req, res) => {
    console.log("here it is ");
    let teamId = req.params.id;
    let matches = await getMatchesByTeamId(teamId);
    // console.log(matches);
    res.status(200).send(JSON.stringify(matches));
});

matchesRouter.post('/', async (req, res) => {
    if (!req.body.matchId || !req.body.winnerId || !req.body.loserId) {
        res.status(400).send(JSON.stringify({message: "Missing required ids"}));
        return;
    }

    try{
        let status = await registerMatchResult(req.body.matchId, req.body.winnerId, req.body.loserId);
        res.status(200).send(JSON.stringify({success: "true"}));
    } catch(e) {
        res.status(500).send(JSON.stringify({success: "false"}));
    }
});

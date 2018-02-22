import express from 'express';
import jwt from 'jsonwebtoken';

import {
    getCostumeContestants,
    getCostumeVotes,
    createCostumeContestant,
    createCostumeVote,
    getCostumeVote,
    deleteCostumeContestant,
    getVotePercentages
} from '../db/costume';
import {isAuthenticated} from '../auth/userAuth';
import {isAuthenticatedAdmin} from '../auth/adminAuth';

const costumeRouter = express.Router();
export default costumeRouter;

costumeRouter.get('/', isAuthenticated, async (req, res) => {
    console.log("/costume");
    try {
        let contestants = await getCostumeContestants();
        res.status(200).send(JSON.stringify(contestants));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

costumeRouter.post('/vote', isAuthenticated, async (req, res) => {
    let costumeId = req.body.costumeId;
    let userId = req.body.userId;
    try {
        let result = await createCostumeVote(costumeId, userId);
        res.status(200).send(JSON.stringify({success: "true"}));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

costumeRouter.get('/vote', isAuthenticated, async (req, res) => {
    let userId = req.userid;
    try {
        let result = await getCostumeVote(userId);
        console.log("returning costumeid", result);

        if(result) res.status(200).send(JSON.stringify({costumeId: result.costume_id}));
        else res.status(200).send(JSON.stringify({costumeId: undefined}));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

costumeRouter.get('/numvotes/:id', isAuthenticated, async (req, res) => {
    let costumeId = req.params.id;
    try {
        let result = await getCostumeVotes(costumeId);
        console.log("returning numVotes", result);

        if(result) res.status(200).send(JSON.stringify({numVotes: result.count}));
        else res.status(200).send(JSON.stringify({N: undefined}));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

 // Admin actions
costumeRouter.post('/', isAuthenticatedAdmin, async (req, res) => {
    console.log(req.body.costumeContestant);
    let costumeContestant = req.body.costumeContestant;

    try {
        let result = await createCostumeContestant(costumeContestant);
        res.status(200).send(JSON.stringify({success: "true"}));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

costumeRouter.delete('/:id', isAuthenticatedAdmin, async (req, res) => {
    try {
        let costumeId = req.params.id;
        let result = await deleteCostumeContestant(costumeId);
        res.status(200).send(JSON.stringify({success: true}));
    } catch(e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

costumeRouter.get('/votepercentages', isAuthenticatedAdmin, async (req, res) => {
    try {
        let result = await getVotePercentages();
        console.log(result);

        let totalVotes = 0;
        for (let row of result){
            totalVotes += Number(row.count);
        }

        let votePercentages = {};
        for (let row of result){
            votePercentages[row.costume_id] = {}
            votePercentages[row.costume_id].count = row.count;
            votePercentages[row.costume_id].percentage = ((Number(row.count) / totalVotes) * 100).toFixed(2);
        }

        res.status(200).send(JSON.stringify(votePercentages));
        // else res.status(200).send(JSON.stringify({N: undefined}));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

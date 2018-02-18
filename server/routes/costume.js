import express from 'express';
import jwt from 'jsonwebtoken';

import {
    getCostumeContestants,
    createCostumeContestant,
    createCostumeVote,
    getCostumeVote,
    deleteCostumeContestant
} from '../db/costume';
import {isAuthenticated} from '../auth/userAuth';

const costumeRouter = express.Router();
export default costumeRouter;
costumeRouter.use(isAuthenticated);

costumeRouter.get('/', async (req, res) => {
    console.log("/costume");
    try {
        let contestants = await getCostumeContestants();
        res.status(200).send(JSON.stringify(contestants));
    } catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

costumeRouter.post('/', async (req, res) => {
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

costumeRouter.post('/vote', async (req, res) => {
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

costumeRouter.get('/vote', async (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    let userId = decoded.id;
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

costumeRouter.delete('/:id', async (req, res) => {
    try {
        let costumeId = req.params.id;
        let result = await deleteCostumeContestant(costumeId);
        res.status(200).send(JSON.stringify({success: true}));
    } catch(e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: "Soemthing went wrong"}));
    }
});

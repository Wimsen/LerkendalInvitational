import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import {getAllMessages} from '../db/chat';

const chatRouter = express.Router();
export default chatRouter;

chatRouter.get("/messages", async (req, res) => {
    const messages = await getAllMessages();
    res.status(200).send(JSON.stringify(messages));
});

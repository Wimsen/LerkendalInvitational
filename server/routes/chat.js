import express from 'express';

import { getAllMessages } from '../db/chat';
import { isAuthenticated } from '../auth/userAuth';

const chatRouter = express.Router();
export default chatRouter;
chatRouter.use(isAuthenticated);

chatRouter.get('/messages', async (req, res) => {
	const messages = await getAllMessages();
	res.status(200).send(JSON.stringify(messages));
});

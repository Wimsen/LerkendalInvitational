import express from 'express';

import {createUser} from '../db/user';
import {authenticate} from '../auth/userAuth';

const userRouter = express.Router();
export default userRouter;

userRouter.post('/authenticate', authenticate, (req, res) => {
    res.status(200).send(JSON.stringify({token: req.token}));
});

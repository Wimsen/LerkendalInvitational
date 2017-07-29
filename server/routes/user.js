import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';

import { validateUser, validateStandUser } from '../model/user';
import { createUser, createStandUser, getAllUsers, getAllStandUsers, getUserByMail, verifyPassword, getUser } from '../db/user';
import { authenticate, isAuthenticated } from '../auth';

const userRouter = express.Router();
export default userRouter;

userRouter.post('/register', async( req, res ) => {
    if ( !req.body.user )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    const newUser = req.body.user;
    let errors = validateUser( newUser );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status(400).send(JSON.stringify(errors));
    }

    try {
        let result = await createUser( newUser );
        res.status( 200 ).send(JSON.stringify(result));
    } catch ( e ) {
        console.log(e);
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

userRouter.post('/registerstanduser', async( req, res ) => {
    if ( !req.body.user )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    const newUser = req.body.user;
    let errors = validateStandUser( newUser );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status(400).send(JSON.stringify(errors));
    }

    try {
        let result = await createStandUser( newUser );
        res.status( 200 ).send(JSON.stringify(result));
    } catch ( e ) {
        console.log(e);
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

userRouter.post('/authenticate', authenticate, ( req, res ) => {
    res.status( 200 ).send(JSON.stringify({token: req.token}));
});

userRouter.post('/logout', ( req, res ) => {
    req.logout( );
});

userRouter.get('*', ( req, res ) => {
    res.sendFile(path.join( __dirname, '../../dist/userindex.html' ));
});

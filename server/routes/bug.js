import express from 'express';
import { createBug, getBugsByUser, deleteBug, updateBug } from '../db/bug';
import { validateBug } from '../model/bug';
import { authenticate, isAuthenticated, authenticateAdmin, isAuthenticatedAdmin } from '../auth';

const bugRouter = express.Router( );
export default bugRouter;

bugRouter.post('/bug', isAuthenticated, async( req, res ) => {
    if ( !req.body.bug )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    let bug = req.body.bug;
    let errors = validateBug( bug );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).send(JSON.stringify( errors ));
    }

    try {
        let result = await createBug( req.username, bug );
        res.status( 200 ).send(JSON.stringify( result ));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

bugRouter.put('/bug', isAuthenticated, async( req, res ) => {
    if ( !req.body.bug )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    let bug = req.body.bug;
    let errors = validateBug( bug );
    if ( Object.keys( errors ).length > 0 ) {
        return res.status( 400 ).send(JSON.stringify( errors ));
    }

    try {
        let result = await updateBug( req.username, bug );
        res.status( 200 ).send(JSON.stringify( result ));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

bugRouter.delete('/bug', isAuthenticated, async( req, res ) => {
    if ( !req.body.id )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    try {
        let bugId = req.body.id;
        let result = await deleteBug( req.username, bugId );
        res.status( 200 ).send(JSON.stringify( result ));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

bugRouter.get('/bugs', isAuthenticated, async( req, res ) => {
    try {
        let bugs = await getBugsByUser( req.username );
        res.status( 200 ).send(JSON.stringify({ bugs: bugs }));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

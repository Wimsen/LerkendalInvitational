import express from 'express';
import path from 'path';
import { authenticate, isAuthenticated, authenticateAdmin, isAuthenticatedAdmin } from '../auth';
import { createAdmin } from '../db/admin';
import { getUser, getAllUsers, getAllStandUsers, deleteUsers, deleteStandusers } from '../db/user';
import { getBugsById, getNumBugs } from '../db/bug';
import { validateAdmin } from '../model/admin';

const adminRouter = express.Router( );
export default adminRouter;

// adminRouter.post("/adminsRegister", async( req, res ) => {
//     if ( !req.body.admin )
//         res.status( 400 ).send(JSON.stringify( "Bad request" ));
//
//     const newAdmin = req.body.admin;
//
//     let errors = validateAdmin( newAdmin );
//     if ( Object.keys( errors ).length > 0 ) {
//         return res.status( 400 ).send(JSON.stringify( errors ));
//     }
//
//     try {
//         let result = await createAdmin( newAdmin );
//         res.status( 200 ).send(JSON.stringify( result ));
//     } catch ( e ) {
//         res.status( 500 ).send(JSON.stringify( e ));
//     }
// });

adminRouter.post("/authenticateAdmin", authenticateAdmin, async( req, res ) => {
    res.status( 200 ).json({ token: req.token });
});

adminRouter.get("/bugsForUser/:id", isAuthenticatedAdmin, async( req, res ) => {
    try {
        let bugs = await getBugsById( req.params.id );
        res.status( 200 ).send(JSON.stringify({ bugs: bugs }));
    } catch ( e ) {
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

adminRouter.get("/users", isAuthenticatedAdmin, async( req, res ) => {
    const users = await getAllUsers( );
    res.status( 200 ).send(JSON.stringify( users ));
});

adminRouter.get('/standusers', isAuthenticatedAdmin, async( req, res ) => {
    const standusers = await getAllStandUsers( );
    res.status( 200 ).send(JSON.stringify( standusers ));
});

adminRouter.get("/user/:id", isAuthenticatedAdmin, async( req, res ) => {
    try {
        const users = await getUser( req.params.id );
        res.status( 200 ).send(JSON.stringify( users ));
    } catch ( e ) {
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

adminRouter.delete('/users', isAuthenticatedAdmin, async( req, res ) => {
    if ( !req.body.userIds )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    try {
        let userIds = req.body.userIds;
        const status = await deleteUsers( userIds )
        res.status( 200 ).send(JSON.stringify( status ));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

adminRouter.delete('/standusers', isAuthenticatedAdmin, async( req, res ) => {
    if ( !req.body.userIds )
        res.status( 400 ).send(JSON.stringify( "Bad request" ));

    try {
        let userIds = req.body.userIds;
        const status = await deleteStandusers( userIds )
        res.status( 200 ).send(JSON.stringify( status ));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

adminRouter.get('/numbugs', isAuthenticatedAdmin, async( req, res ) => {
    try {
        const count = await getNumBugs( );
        res.status( 200 ).send(JSON.stringify( count ));
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
});

adminRouter.get('*', ( req, res ) => {
    res.sendFile(path.join( __dirname, '../../dist/adminindex.html' ));
});

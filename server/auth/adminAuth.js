import jwt from 'jsonwebtoken';
import { getAdminByUsername, verifyPasswordAdmin } from '../db/admin';
import { UserNotFound } from '../../common/errormessages';

export async function authenticateAdmin( req, res, next ) {
    try {
        let username = req.body.username.toLowerCase( );
        let password = req.body.password;

        let admin = await getAdminByUsername( username );
        let success = await verifyPasswordAdmin( password, admin.password_hash );
        const payload = {
            username: username
        };
        const token = jwt.sign( payload, process.env.SECRET_KEY );
        req.token = token;
        next( );
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).send(JSON.stringify( e ));
    }
};

export async function isAuthenticatedAdmin( req, res, next ) {
    try {
        const token = req.headers.authorization.split( ' ' )[ 1 ];
        let decoded = jwt.verify( token, process.env.SECRET_KEY );
        let username = decoded.username;
        console.log( "Admin " + username + " is authenticated  " );
        next( );
    } catch ( err ) {
        console.log( err );
        res.status( 401 ).send({ message: "unauthorized" });
    };
};

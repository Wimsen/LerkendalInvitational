import jwt from 'jsonwebtoken';
import { getUserByMail, verifyPassword } from '../db/user';
import { UserNotFound, DBErrorName } from '../../common/errormessages';

export async function authenticate( req, res, next ) {
    try {
        let username = req.body.mail.toLowerCase( );
        let password = req.body.password;

        let user = await getUserByMail( username );
        let success = await verifyPassword( password, user.password_hash );
        const payload = {
            username: username,
            name: user.name
        };
        const token = jwt.sign( payload, process.env.SECRET_KEY );
        req.token = token;
        next( );
    } catch ( e ) {
        res.status( 500 ).send(JSON.stringify( e ));
    }
};

export async function isAuthenticated( req, res, next ) {
    try {
        const token = req.headers.authorization.split( ' ' )[ 1 ];
        let decoded = jwt.verify( token, process.env.SECRET_KEY );
        let username = decoded.username;
        console.log( "User " + username + " is authenticated  " );
        req.username = username;
        next( );
    } catch ( err ) {
        res.status( 401 ).send({ message: "unauthorized" });
    };
};

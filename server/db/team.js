import { VError } from 'verror';
import bcrypt from 'bcrypt';

import { GeneralError, DBErrorName, ValidationError, UserNotFound, UserAlreadyExists } from '../../common/errormessages';
import { dbRunPromise, dbFindId, dbFindOne } from './db';
import { escapeUser } from '../model/user';

const saltRounds = 10;

export async function getAllUsers( ) {
    try {
        let users = await dbRunPromise( 'SELECT * FROM users WHERE deleted != 1' );
        return users;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e
        }, 'Failed to get all users' );
    }
}

export async function getAllStandUsers( ) {
    try {
        let standUsers = await dbRunPromise( 'SELECT * FROM standusers WHERE deleted != 1' );
        return standUsers;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e
        }, 'Failed to get all stand users' );
    }
}

export async function getUser( id ) {
    let user;
    try {
        const userIdInt = parseInt( id );
        user = await dbFindId( 'users', userIdInt );
    } catch ( e ) {
        throw( {
            name: DBErrorName
        }, 'Failed to find user by ID. ' );
    }

    if ( !user ) {
        throw new VError( {
            name: DBErrorName,
            info: id
        },  UserNotFound)
    }

    return user;
}

export async function getUserByMail( mail ) {
    let user = null;
    try {
        user = await dbFindOne('users', { mail });
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            info: mail
        }, 'Couldn\'t get user by mail. ' );
    }

    if ( !user ) {
        throw new VError({
            name: DBErrorName,
            info: mail
        }, UserNotFound);
    }

    return user;
}

export async function verifyPassword( password, password_hash ) {
    let success = bcrypt.compareSync( password, password_hash );
    if(success) return true;

    else throw new VError({
        name: DBErrorName
    }, UserNotFound);
}

export async function createUser( newUser ) {
    escapeUser( newUser );

    var hash = bcrypt.hashSync( newUser.password, saltRounds );
    try {
        let userMail = newUser.mail.toLowerCase();
        let userName = newUser.name.toLowerCase().replace(/[åøæÅÆØ]*(\w\S*)/g, (txt) => {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        let result = await dbRunPromise('INSERT INTO users AS u (mail, name, password_hash) VALUES ($1, $2, $3)', [ userMail, userName, hash ]);
        return result;
    } catch ( e ) {
        let message = GeneralError;
        if ( e.code == 23505 ) {
            message = UserAlreadyExists;
        }
        throw new VError( message );
    }
}

export async function createStandUser( newUser ) {
    escapeUser( newUser );

    try {
        let result = await dbRunPromise('INSERT INTO standusers AS u (mail, name) VALUES ($1, $2)', [ newUser.mail, newUser.name ]);
        return result;
    } catch ( e ) {
        let message = GeneralError;
        if ( e.code == 23505 ) {
            message = UserAlreadyExists;
        }
        throw new VError( message );
    }
}

export async function deleteUsers( userIds ) {
    try {
        console.log(userIds);
        let params = userIds.map((userId, index) => {
            return '$' + (index + 1);
        });
        console.log(params);
        let queryString = 'UPDATE users SET deleted = 1 WHERE id IN (' + params.join(', ') + ')';
        console.log(queryString);
        let result = await dbRunPromise(queryString, userIds);
        return result;
    } catch (e) {
        console.log(e);
        throw new VError({
            name: DBErrorName,
        }, "Could not delete users");
    }
}

export async function deleteStandusers( userIds ) {
    try {
        console.log(userIds);
        let params = userIds.map((userId, index) => {
            return '$' + (index + 1);
        });
        console.log(params);
        let queryString = 'UPDATE standusers SET deleted = 1 WHERE id IN (' + params.join(', ') + ')';
        console.log(queryString);
        let result = await dbRunPromise(queryString, userIds);
        return result;
    } catch (e) {
        console.log(e);
        throw new VError({
            name: DBErrorName,
        }, "Could not delete users");
    }
}

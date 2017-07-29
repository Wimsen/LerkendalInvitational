import bcrypt from 'bcrypt';
import { VError } from 'verror';
import { dbRunPromise, dbFindOne } from './db';
import { GeneralError, DBErrorName, UserNotFound, UserAlreadyExists } from '../../common/errormessages';

const saltRounds = 10;

export async function getAdminByUsername( username ) {
    let admin = null;
    try {
        admin = await dbFindOne('admins', { username });
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e,
            info: {
                username
            }
        }, 'Failed to lookup admin by username' );
    }

    if ( !admin ) {
        throw new VError(UserNotFound);
    }

    return admin;
}

export async function verifyPasswordAdmin( password, password_hash ) {
    let success = bcrypt.compareSync( password, password_hash );
    if(success) return true;

    else throw new VError({
        name: DBErrorName
    }, UserNotFound);
}

export async function createAdmin( admin ) {
    var hash = bcrypt.hashSync( admin.password, saltRounds );
    let result;
    try {
        let adminUsername = admin.username.toLowerCase();
        result = await dbRunPromise('INSERT INTO admins AS a (username, password_hash) VALUES($1, $2)', [ adminUsername, hash ]);
    } catch ( e ) {
        let message = GeneralError;
        if ( e.code == 23505 ) {
            message = UserAlreadyExists;
        }
        throw new VError( message );
    }

    return result;
}

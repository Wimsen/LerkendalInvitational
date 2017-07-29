import { VError } from 'verror';
import { dbRunPromise, dbFindId, dbFindOne } from './db';
import { getUserByMail, getUser } from './user';
import { GeneralError, DBErrorName, UserNotFound, UserAlreadyExists } from '../../common/errormessages';

export async function getBugsByUser( username ) {
    try {
        let user = await getUserByMail( username );
        let bugs = await dbRunPromise('SELECT * FROM bugs WHERE user_id = $1', [ user.id ]);
        return bugs;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e
        }, 'Failed to get bugs by user' );
    }
}

export async function getBugsById( id ) {
    try {
        let user = await getUser( id );
        let bugs = await dbRunPromise('SELECT * FROM bugs WHERE user_id = $1', [ user.id ]);
        return bugs;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e
        }, 'Failed to get bugs by user ID' );
    }
}

export async function createBug( username, bug ) {
    try {
        let user = await getUserByMail( username );
        let result = await dbRunPromise('INSERT INTO bugs AS b(user_id, title, description, category, route) VALUES($1, $2, $3, $4, $5)', [ user.id, bug.title, bug.description, bug.category, bug.route ]);
        return result;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e
        }, 'Failed to create bug' );
    }
}

export async function updateBug( username, bug ) {
    try {
        let user = await getUserByMail( username );
        let result = await dbRunPromise('UPDATE bugs SET title=$1, description=$2, category=$3 WHERE id=$4', [ bug.title, bug.description, bug.category, bug.id ]);
        return result;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            case: e
        }, 'Failed to update bug' );
    }
}

export async function deleteBug( username, bugId ) {
    try {
        let user = await getUserByMail( username );
        let result = await dbRunPromise('DELETE FROM bugs WHERE id = $1 AND user_id = $2', [ bugId, user.id ]);
        return result;
    } catch ( e ) {
        throw new VError( {
            name: DBErrorName,
            cause: e
        }, 'Failed to delete bug ' );
    }
}

export async function getNumBugs(){
    try {
        let result = await dbRunPromise('SELECT count(*), user_id FROM bugs JOIN users ON bugs.user_id = users.id WHERE users.deleted != 1 GROUP BY user_id');
        return result;
    } catch (e) {
        throw new VError({
            name: DBErrorName,
            cause: e,
            info: {
                userId: userId
            }
        }, 'Couldn\'t count bugs for user ID');
    }
}

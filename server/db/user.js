import {VError} from 'verror';
import bcrypt from 'bcrypt';

import {dbRunPromise, dbFindId, dbFindOne} from './db';
import {escapeUser} from '../model/user';

const GeneralError = "Noe gikk galt. Vennligst prøv igjen senere. ";
const UserNotFound = "Feil brukernavn / passord ";
const UserAlreadyExists = "Brukeren eksisterer allerede. ";
const DBErrorName = "DBError";
const ValidationError = "Validering feilet. ";

const saltRounds = 10;

// export async function getAllUsers() {
//     try {
//         let users = await dbRunPromise('SELECT * FROM teams');
//         return users;
//     } catch (e) {
//         throw new VError({
//             name: DBErrorName,
//             cause: e
//         }, 'Failed to get all users');
//     }
// }
//
// export async function getUser(id) {
//     let user;
//     try {
//         const userIdInt = parseInt(id);
//         user = await dbFindId('users', userIdInt);
//     } catch (e) {
//         throw({
//             name: DBErrorName
//         }, 'Failed to find user by ID. ');
//     }
//
//     if (!user) {
//         throw new VError({
//             name: DBErrorName,
//             info: id
//         }, UserNotFound)
//     }
//
//     return user;
// }

export async function getUserByUsername(username) {
    let user = null;
    try {
        user = await dbFindOne('users', {username: username});
    } catch (e) {
        console.log(e);
        throw new VError({
            name: DBErrorName,
            info: username
        }, 'Couldn\'t get user by username. ');
    }

    if (!user) {
        throw new VError({
            name: DBErrorName,
            info: username
        }, UserNotFound);
    }

    return user;
}

export async function verifyPassword(password, password_hash) {
    let success = bcrypt.compareSync(password, password_hash);
    if (success){
        return true;
    } else {
        throw new VError({
            name: DBErrorName
        }, UserNotFound);
    }
}
//
// export async function createUser(newUser) {
//     escapeUser(newUser);
//     try {
//         let hash = bcrypt.hashSync(newUser.password, saltRounds);
//         let username = newUser.username.toLowerCase();
//         let result = await dbRunPromise('INSERT INTO users AS u (username, password_hash) VALUES ($1, $2)', [username, hash]);
//         return result;
//     } catch (e) {
//         console.log(e);
//         let message = GeneralError;
//         if (e.code == 23505) {
//             message = UserAlreadyExists;
//         }
//         throw new VError(message);
//     }
// }

// export async function deleteUsers(userIds) {
//     try {
//         console.log(userIds);
//         let params = userIds.map((userId, index) => {
//             return '$' + (
//             index + 1);
//         });
//         console.log(params);
//         let queryString = 'UPDATE users SET deleted = 1 WHERE id IN (' + params.join(', ') + ')';
//         console.log(queryString);
//         let result = await dbRunPromise(queryString, userIds);
//         return result;
//     } catch (e) {
//         console.log(e);
//         throw new VError({
//             name: DBErrorName
//         }, "Could not delete users");
//     }
// }

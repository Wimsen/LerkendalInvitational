import {VError} from 'verror';

import {dbRunPromise, dbFindId, dbFindOne} from './db';

const GeneralError = "Noe gikk galt. Vennligst prøv igjen senere. ";
const UserNotFound = "Feil brukernavn / passord ";
const UserAlreadyExists = "Brukeren eksisterer allerede. ";
const DBErrorName = "DBError";
const ValidationError = "Validering feilet. ";

export async function getCostumeContestants() {
    try {
        let contestants = await dbRunPromise('SELECT * FROM costumes');
        return contestants;
    } catch (e) {
        throw new VError({
            name: DBErrorName,
            cause: e
        }, 'Failed to get all users');
    }
}

export async function getCostumeVotes(costumeId) {
    try {
        let numVotes = await dbRunPromise('SELECT COUNT(*) FROM costumes_votes WHERE costume_id = $1', [costumeId]);
        console.log(numVotes);
        return numVotes[0];
    } catch (e) {
        throw new VError({
            name: DBErrorName,
            cause: e
        }, 'Failed to get all num votes');
    }
}

export async function createCostumeContestant(costumeContestant) {
    try {
        let result = await dbRunPromise('INSERT INTO costumes AS c (teamname, s3key) VALUES ($1, $2)', [costumeContestant.teamname, costumeContestant.s3key]);
        return result;
    } catch (e) {
        console.log(e);

        throw new VError("feil");
    }
}

export async function createCostumeVote(costumeId, userId) {
    try {
        let result = await dbRunPromise('INSERT INTO costumes_votes VALUES ($1, $2) ON CONFLICT (team_id) DO UPDATE SET costume_id = Excluded.costume_id;', [costumeId, userId]);
        return result;
    } catch(e) {
        console.log(e);
        throw new VError("feil");
    }
}

export async function getCostumeVote(userId) {
    try {
        let id = await dbRunPromise('SELECT costume_id FROM costumes_votes WHERE team_id = $1', [userId]);
        console.log("from db", id);
        return id[0];
    } catch(e) {
        console.log(e);
        throw new VError("feil");
    }
}

export async function deleteCostumeContestant(costumeId){
    try {
        let result = await dbRunPromise('DELETE FROM costumes_votes WHERE costume_id = $1', [costumeId]);
        let result2 = await dbRunPromise('DELETE FROM costumes WHERE id = $1', [costumeId]);
        return "success";
    } catch(e) {
        console.log(e);
        throw new VError("Feil");
    }
}

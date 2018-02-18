import {VError} from 'verror';
import bcrypt from 'bcrypt';

import {dbRunPromise, dbFindId, dbFindOne} from './db';

const GeneralError = "Noe gikk galt. Vennligst prøv igjen senere. ";
const UserNotFound = "Feil epost / passord ";
const UserAlreadyExists = "Laget eksisterer allerede. ";
const DBErrorName = "DBError";
const ValidationError = "Validering feilet. ";
const saltRounds = 10;

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

export async function createTeams(teams) {
    try {
        await Promise.all(teams.map(async (team) => {
            let hash = bcrypt.hashSync('123qweasd', saltRounds);
            let result = await dbRunPromise('INSERT INTO teams AS t (username, password_hash, teamname, member1, member2, group_number) VALUES ($1, $2, $3, $4, $5, $6)', [team.email, hash, team.teamname, team.member1, team.member2, team.group_number]);
            return result;
        }));
    } catch (e) {
        console.log(e);
    }
}

export async function createTeam(newUser) {
    escapeUser(newUser);
    try {
        let hash = bcrypt.hashSync(newUser.password, saltRounds);
        let username = newUser.username.toLowerCase();
        let result = await dbRunPromise('INSERT INTO users AS u (username, password_hash) VALUES ($1, $2)', [username, hash]);
        return result;
    } catch (e) {
        console.log(e);
        let message = GeneralError;
        if (e.code == 23505) {
            message = UserAlreadyExists;
        }
        throw new VError(message);
    }
}

export async function getTeams() {
    try {
        let teams = await dbRunPromise('SELECT * FROM teams');
        return teams;
    } catch (e) {
        throw new VError({
            name: DBErrorName,
            cause: e
        }, 'Failed to get all users');
    }
}

export async function getMatches() {
    try {
        let matches = await dbRunPromise('SELECT * FROM matches');
        return matches;
    } catch (e) {
        throw new VError({
            name: DBErrorName,
            cause: e
        }, 'Failed to get all matches');
    }
}

export async function getTeam(id) {
    let team;
    try {
        const teamIdInt = parseInt(id);
        team = await dbFindId('teams', teamIdInt);
    } catch (e) {
        throw({
            name: DBErrorName
        }, 'Failed to find team by ID. ');
    }

    if (!team) {
        throw new VError({
            name: DBErrorName,
            info: id
        }, UserNotFound)
    }

    return team;
}

export async function getTeamByEmail(email) {
    let user = null;
    try {
        user = await dbFindOne('teams', {username: email});
    } catch (e) {
        console.log(e);
        throw new VError({
            name: DBErrorName,
            info: username
        }, 'Couldn\'t get team by email. ');
    }

    if (!user) {
        throw new VError({
            name: DBErrorName,
            info: username
        }, UserNotFound);
    }

    return user;
}

export async function createMatches(matches) {
    try {
        await Promise.all(matches.map(async (match) => {
            let result = await dbRunPromise('INSERT INTO matches AS m (team1_id, team2_id, table_number, start_time) VALUES ($1, $2, $3, $4)', [match.team1_id, match.team2_id, match.table_number, match.start_time]);
        }));
        return {success: "true"};
    } catch (e) {
        console.log(e);
    }
}

export async function resetTournament() {
    try {
        let result = await dbRunPromise('DELETE FROM costumes_votes; DELETE FROM costumes; DELETE FROM matches; DELETE FROM teams; DELETE FROM users; DELETE FROM chat');
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function getMatchesByTeamId(id) {
    try {

        let matches = await dbRunPromise('SELECT * FROM matches WHERE team1_id = $1 OR team2_id = $1', [id]);
        return matches;
    } catch (e) {
        console.log(e);
    }
}

export async function registerMatchResult(matchId, winnerId, loserId) {
    try {
        // TODO transaction
        await dbRunPromise('UPDATE matches SET winner_id = $1 WHERE id = $2;', [winnerId, matchId]);
        let team1_points = await dbRunPromise('SELECT count(*) from matches where winner_id = $1', [winnerId]);
        let team2_points = await dbRunPromise('SELECT count(*) from matches where winner_id = $1', [loserId]);

        await dbRunPromise('UPDATE teams SET points = $1 where id = $2', [team1_points[0].count, winnerId]);
        await dbRunPromise('UPDATE teams SET points = $1 where id = $2', [team2_points[0].count, loserId]);

        return team1_points;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

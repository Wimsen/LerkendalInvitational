import {VError} from 'verror';

import {dbRunPromise, dbFindId, dbFindOne} from './db';

const GeneralError = "Noe gikk galt. Vennligst prøv igjen senere. ";
const UserNotFound = "Feil brukernavn / passord ";
const UserAlreadyExists = "Brukeren eksisterer allerede. ";
const DBErrorName = "DBError";
const ValidationError = "Validering feilet. ";

export async function getTeams() {
    try {
        let teams = await dbRunPromise('SELECT * FROM teams');
        // console.log("returning here ");
        console.log("get teams returning");
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
        // console.log("returning here ");
        console.log("get matches returning");
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

export async function createTeams(teams) {
    try {
        await Promise.all(teams.map(async (team) => {
            let result = await dbRunPromise('INSERT INTO teams AS u (teamname, member1, member2, group_number) VALUES ($1, $2, $3, $4)', [team.teamname, team.member1, team.member2, team.group_number]);
            return result;
        }));
        console.log("create teams returning");
    } catch (e) {
        console.log(e);
    }
}

export async function createMatches(matches) {
    try {
        await Promise.all(matches.map(async (match) => {
            let result = await dbRunPromise('INSERT INTO matches AS m (team1_id, team2_id, table_number, start_time) VALUES ($1, $2, $3, $4)', [match.team1_id, match.team2_id, match.table_number, match.start_time]);
        }));
        console.log("Create matches returning");
        return {success: "true"};
    } catch (e) {
        console.log(e);
    }
}

export async function resetTournament() {
    try {
        let result = await dbRunPromise('DELETE FROM matches; DELETE FROM teams; DELETE FROM users; DELETE FROM chat');
        return result;
    } catch (e) {
        console.log(e);
    }
}

export async function getMatchesByTeamId(id) {
    try {

        let matches = await dbRunPromise('SELECT * FROM matches WHERE team1_id = $1 OR team2_id = $1', [id]);
        console.log("HERE");
        console.log(matches);
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

        console.log("HERE");
        return team1_points;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

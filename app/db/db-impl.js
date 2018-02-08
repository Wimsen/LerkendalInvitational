import {userFetch} from '../auth';

export async function getTeams() {
    try {
        let teams = await userFetch('/api/teams');
        return teams;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getTeam(id) {
    try {
        let team = await userFetch(`/api/team/${id}`);
        return team;
    } catch (e) {
        console.log(e);
        return {};
    }
}

export async function getMatches() {
    try {
        let matches = await userFetch('/api/matches');
        return matches;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getGroups() {
    try {
        let groups = {};
        let teams = await getTeams();
        teams.map((team) => {
            if (groups[team.group_number]) {
                groups[team.group_number].push(team)
            } else {
                groups[team.group_number] = []
                groups[team.group_number].push(team)
            }
        });

        return groups;

    } catch (e) {
        console.log(e);
        return {};
    }
}

export async function getMatchesByTeamId(id) {
    try {
        let matches = await userFetch(`/api/matches/team/${id}`);
        return matches;
    } catch (e) {
        console.log(e);
        return []; 
    }
}

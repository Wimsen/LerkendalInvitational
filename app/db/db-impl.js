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
        matches.sort((match1, match2) => {
            let dateDiff = new Date(match1.start_time) - new Date(match2.start_time);
            if(dateDiff == 0){
                return match1.table_number > match2.table_number;
            }
            return dateDiff;
        })
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

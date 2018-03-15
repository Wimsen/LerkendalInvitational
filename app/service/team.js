import { authFetch } from '../auth/userAuth';

export async function getTeams() {
	try {
		let teams = await authFetch('/api/team');
		return teams;
	} catch (e) {
		console.log(e);
		return [];
	}
}

export async function getTeam(id) {
	try {
		let team = await authFetch(`/api/team/${id}`);
		return team;
	} catch (e) {
		console.log(e);
		return {};
	}
}

export async function getGroups() {
	try {
		let groups = {};
		let teams = await getTeams();
		teams.map(team => {
			if (groups[team.group_number]) {
				groups[team.group_number].push(team);
			} else {
				groups[team.group_number] = [];
				groups[team.group_number].push(team);
			}
		});

		return groups;
	} catch (e) {
		console.log(e);
		return {};
	}
}

import { NotificationManager } from 'react-notifications';
import { authFetch } from '../auth/userAuth';

export async function getMatches() {
	try {
		let matches = await authFetch('/api/match');
		matches.sort((match1, match2) => {
			let dateDiff =
				new Date(match1.start_time) - new Date(match2.start_time);
			if (dateDiff == 0) {
				return match1.table_number > match2.table_number;
			}
			return dateDiff;
		});
		return matches;
	} catch (e) {
		console.log(e);
		return [];
	}
}

export async function getMatchesByTeamId(id) {
	try {
		let matches = await authFetch(`/api/match/team/${id}`);
		return matches;
	} catch (e) {
		console.log(e);
		return [];
	}
}

export async function registerResult(matchId, winnerId, loserId) {
	try {
		await authFetch('/api/match', {
			matchId: matchId,
			winnerId: winnerId,
			loserId: loserId
		});
		NotificationManager.success('Resultat lagret', 'Vellykket');
		return 'success';
	} catch (e) {
		console.log(e);
		NotificationManager.error(
			'Noe gikk galt. Vennligst prøv igjen',
			'Feil'
		);
		return [];
	}
}

import {userFetch} from './auth';

export async function registerResult(matchId, winnerId, loserId) {
    try {

        let teams = await userFetch('/api/matches', {
            matchId: matchId,
            winnerId: winnerId,
            loserId: loserId
        });
        return []
        // return teams;
    } catch (e) {
        console.log(e);
        return [];
    }
}

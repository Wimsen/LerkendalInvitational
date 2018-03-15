import express from 'express';

import {
	getTeams,
	getTeam,
	getMatches,
	getMatchesByTeamId,
	registerMatchResult,
	isEligibleForRegisterResult
} from '../db/team';
import { isAuthenticated } from '../auth/userAuth';
import {
	isAuthenticatedAdmin,
	isRequestAdminAuthenticated
} from '../auth/adminAuth';

const matchesRouter = express.Router();
export default matchesRouter;
matchesRouter.use(isAuthenticated);

matchesRouter.get('/', async (req, res) => {
	let matches = await getMatches();
	res.status(200).send(JSON.stringify(matches));
});

matchesRouter.get('/team/:id', async (req, res) => {
	let teamId = req.params.id;
	let matches = await getMatchesByTeamId(teamId);
	res.status(200).send(JSON.stringify(matches));
});

matchesRouter.post('/', async (req, res, next) => {
	if (!req.body.matchId || !req.body.winnerId || !req.body.loserId) {
		res
			.status(400)
			.send(JSON.stringify({ message: 'Missing required ids' }));
		return;
	}

	let permissionGranted = false;

	try {
		permissionGranted = await isEligibleForRegisterResult(
			req.userid,
			req.body.matchId
		);
		if (!permissionGranted) {
			// Th
			permissionGranted = await isRequestAdminAuthenticated(req);
		}
	} catch (e) {
		console.log(e);
		res.status(500).send(JSON.stringify({ success: 'false' }));
	}

	if (permissionGranted) {
		// By now we are either supposed to register the result,
		// or we are an admin
		let status = await registerMatchResult(
			req.body.matchId,
			req.body.winnerId,
			req.body.loserId
		);
		res.status(200).send(JSON.stringify({ success: 'true' }));
	} else {
		res.status(401).send({ message: 'unauthorized' });
	}
});

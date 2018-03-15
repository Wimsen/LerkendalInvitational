import jwt from 'jsonwebtoken';
import { getAdminByUsername, verifyPassword } from '../db/admin';

export async function authenticateAdmin(req, res, next) {
	try {
		let username = req.body.username.toLowerCase();
		let password = req.body.password;

		let user = await getAdminByUsername(username);
		let success = await verifyPassword(password, user.password_hash);

		const payload = {
			id: user.id,
			username: username
		};

		const token = jwt.sign(payload, process.env.ADMIN_SECRET_KEY);
		req.token = token;
		next();
	} catch (e) {
		console.log(e);
		res.status(500).send(JSON.stringify(e));
	}
}

export async function isAuthenticatedAdmin(req, res, next) {
	try {
		const token = req.headers['admin-auth'].split(' ')[1];
		let decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
		let username = decoded.username;
		// TODO check if user actually exists
		console.log('Admin ' + username + ' is authenticated  ');
		req.username = username;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send({ message: 'unauthorized' });
	}
}

export async function isRequestAdminAuthenticated(req) {
	try {
		const token = req.headers['admin-auth'].split(' ')[1];
		let decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
		let username = decoded.username;
		// TODO check if user actually exists
		return true;
	} catch (e) {
		return false;
	}
}

import { VError } from 'verror';
import bcrypt from 'bcrypt';

import { dbRunPromise, dbFindId, dbFindOne } from './db';

const GeneralError = 'Noe gikk galt. Vennligst prøv igjen senere. ';
const UserNotFound = 'Feil brukernavn / passord ';
const UserAlreadyExists = 'Brukeren eksisterer allerede. ';
const DBErrorName = 'DBError';
const ValidationError = 'Validering feilet. ';

const saltRounds = 10;

export async function getAdminByUsername(username) {
	let user = null;
	try {
		user = await dbFindOne('admins', { username: username });
	} catch (e) {
		console.log(e);
		throw new VError(
			{
				name: DBErrorName,
				info: username
			},
			"Couldn't get admin by username. "
		);
	}

	if (!user) {
		throw new VError(
			{
				name: DBErrorName,
				info: username
			},
			UserNotFound
		);
	}

	return user;
}

export async function verifyPassword(password, password_hash) {
	let success = bcrypt.compareSync(password, password_hash);
	if (success) {
		return true;
	} else {
		throw new VError(
			{
				name: DBErrorName
			},
			UserNotFound
		);
	}
}

export async function createAdmin(admin) {
	try {
		let hash = bcrypt.hashSync(admin.password, saltRounds);
		let username = admin.username.toLowerCase();
		let result = await dbRunPromise(
			'INSERT INTO admins AS a (username, password_hash) VALUES ($1, $2)',
			[username, hash]
		);
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

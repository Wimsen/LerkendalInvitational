import { VError } from 'verror';

import { dbRunPromise, dbFindId, dbFindOne } from './db';

const GeneralError = 'Noe gikk galt. Vennligst prøv igjen senere. ';
const UserNotFound = 'Feil brukernavn / passord ';
const UserAlreadyExists = 'Brukeren eksisterer allerede. ';
const DBErrorName = 'DBError';
const ValidationError = 'Validering feilet. ';

export async function createMessage(newMessage) {
	try {
		let result = await dbRunPromise(
			'INSERT INTO chat AS c (author, textcontent, type, s3key) VALUES ($1, $2, $3, $4)',
			[
				newMessage.author,
				newMessage.textcontent,
				newMessage.type,
				newMessage.s3key
			]
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

export async function getAllMessages() {
	try {
		let messages = await dbRunPromise(
			'SELECT * FROM chat ORDER BY created DESC LIMIT 60'
		);
		return messages;
	} catch (e) {
		throw new VError(
			{
				name: DBErrorName,
				cause: e
			},
			'Failed to get all messages'
		);
	}
}

import jwtDecode from 'jwt-decode';
import { NotificationManager } from 'react-notifications';

export async function authenticate(username, password) {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await authFetch('/api/user/authenticate', {
				username: username,
				password: password
			});

			let token = response.token;
			localStorage.setItem('id_token', token);
			resolve(response);
		} catch (e) {
			reject(e);
		}
	});
}

export async function adminAuthenticate(username, password) {
	return new Promise(async (resolve, reject) => {
		try {
			let response = await authFetch('/api/admin/authenticate', {
				username: username,
				password: password
			});

			let token = response.token;
			localStorage.setItem('admin_token', token);
			resolve(response);
		} catch (e) {
			reject(e);
		}
	});
}

export async function authFetch(
	endpoint,
	body,
	methodParam,
	headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
) {
	let method =
		methodParam == undefined
			? body == undefined ? 'GET' : 'POST'
			: methodParam;

	if (isAuthenticated())
		headers['auth'] = `Bearer: ${localStorage.getItem('id_token')}`;

	if (isAdminAuthenticated())
		headers['admin-auth'] = `Bearer: ${localStorage.getItem(
			'admin_token'
		)}`;

	return new Promise(async (resolve, reject) => {
		try {
			let response = await fetch(endpoint, {
				method: method,
				headers: headers,
				body: JSON.stringify(body)
			});
			let responseJson = await response.json();
			if (response.ok) {
				resolve(responseJson);
			} else {
				if (response.status == 401) {
					NotificationManager.error(
						'Du må logge inn for å se innholdet på denne siden',
						'Vennligst logg inn'
					);
				}
				reject(responseJson);
			}
		} catch (error) {
			reject(error);
		}
	});
}

export function isAuthenticated() {
	return localStorage.getItem('id_token') != null;
}

export function isAdminAuthenticated() {
	return localStorage.getItem('admin_token') != null;
}

export function getUserInfo() {
	if (!isAuthenticated()) return { name: 'Ikke logget inn' };
	let token = localStorage.getItem('id_token');
	return jwtDecode(token);
}

export function logOut() {
	localStorage.removeItem('id_token');
}

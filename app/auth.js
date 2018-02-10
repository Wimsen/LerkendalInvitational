import jwtDecode from 'jwt-decode';

export async function authenticate(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await userFetch('/api/authenticate', {
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

export async function getFetch(endpoint, headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
) {
    let method = 'GET';
    return new Promise(async (resolve, reject) => {
        try {
            let response = await fetch(endpoint, {
                method: method,
                headers: headers
            });
            if (response.ok) {
                resolve(response);
            } else {
                reject(response);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export async function userFetch(endpoint, body, methodParam, headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}) {
    let method = methodParam == undefined
        ? body == undefined
            ? 'GET'
            : 'POST'
        : methodParam;

    if (isAuthenticated())
        headers['authorization'] = `Bearer: ${localStorage.getItem('id_token')}`;
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
                reject(responseJson);
            }
        } catch (error) {
            reject(error);
        }
    });
}

export function isAuthenticated() {
    if (localStorage.getItem('id_token') === null)
        return false;
    else
        return true;
    }

export function isAdminAuthenticated() {
    // if (localStorage.getItem('admin_id_token') === null)
    return localStorage.getItem('id_token') != null;
    }

export function getUserInfo() {
    if (!isAuthenticated())
        return {name: 'Ikke logget inn'}
    console.log(localStorage.getItem('id_token'));
    let token = localStorage.getItem('id_token');
    return jwtDecode(token);
}

export function logOut() {
    localStorage.removeItem('id_token');
}

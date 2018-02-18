 import jwtDecode from 'jwt-decode';

export async function adminAuthenticate(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await adminFetch('/api/admin/authenticate', {
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

export async function adminFetch(endpoint, body, methodParam, headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}) {
    let method = methodParam == undefined
        ? body == undefined
            ? 'GET'
            : 'POST'
        : methodParam;

    if (isAdminAuthenticated())
        headers['authorization'] = `Bearer: ${localStorage.getItem('admin_token')}`;
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


export function isAdminAuthenticated() {
    return localStorage.getItem('admin_token') != null;
}

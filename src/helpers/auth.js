import { store } from '../store/store';
import { history } from '../index';
import decode from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;


export function getJWT() {
    const token = localStorage.getItem('token');

    if (!token) {
        store.dispatch({ type: "LOGOUT_SUCCES" });
        history.push('/login');
        return null;
    }

    const parsed = JSON.parse(token);
    const decoded = decode(parsed.jwt);

    if (decoded.exp - Date.now() / 1000 < 60) {
     return  fetch(`${apiUrl}/user/${decoded.userId}/token`, {
            method: "PUT",
            headers: {
                " Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken: parsed.refreshToken })
        })
            .then(response => response.json())
            .then(newToken => {
                if (newToken.error) throw newToken.error;
                localStorage.setItem('token', newToken);
                console.log("token " + token);
                return newToken.jwt;
            })
            .catch(() => {
                store.dispatch({ type: "LOGOUT_SUCCES" });
                localStorage.removeItem('token')
                history.push('/login');
                return null;
            });
    }
    return Promise.resolve (parsed.jwt);

}



export function loginRequest(data) {
    return request(data, 'login');
}

export function registerRequest(data) {
    return request(data, 'register');
}



function request(data, type) {
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data)
    };

    let url;
    if (type === 'login') {
        url = `${apiUrl}/user/sign-in`;
    }
    else if (type === 'register') {
        url = `${apiUrl}/user`;
    }

    return fetch(url, config)
        .then((response) => response.json())
        .then((result) => {
            if (result.error) {
                throw result.error;
            }
            return result;
        });
}



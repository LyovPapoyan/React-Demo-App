export function getJWT() {
    const token = localStorage.getItem('token');
    if (!token) {
        // throw error
        return
    }

    return JSON.parse(token).jwt;
}

const apiUrl = process.env.REACT_APP_API_URL;



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
    if(type==='login'){
        url = `${apiUrl}/user/sign-in`;
    }
    else if(type==='register'){
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
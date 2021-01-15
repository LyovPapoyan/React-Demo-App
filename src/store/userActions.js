import request from '../request';

const apiUrl = process.env.REACT_APP_API_URL;

export function register(data) {

    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

        request(`${apiUrl}/user`, "POST", data)
        .then(response => {
             dispatch({type: "REGISTER_SUCCES", response, })
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}


export function login (data) {
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

        request(`${apiUrl}/user/sign-in`, "POST", data)
        .then(token => {
            localStorage.setItem('token', JSON.stringify(token));
             dispatch({type: "LOGIN_SUCCES" })
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}


export function logout () {
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})
        
        const token = localStorage.getItem('token');
        const parsed = JSON.parse(token).jwt;
    
        request(`${apiUrl}/user/sign-out`, "POST", {jwt: parsed})
        .then((response) => {
            console.log(response);
            localStorage.removeItem('token');
             dispatch({type: "LOGOUT_SUCCES" })
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}

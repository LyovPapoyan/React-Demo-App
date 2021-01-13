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
    console.log(data);
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

        request(`${apiUrl}/user/sign-in`, "POST", data)
        .then(token => {
            console.log(token);
            localStorage.setItem('token', JSON.stringify(token));
             dispatch({type: "LOGIN_SUCCES" })
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}

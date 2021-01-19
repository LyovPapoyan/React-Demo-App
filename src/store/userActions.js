import request from '../helpers/request';
import {getJWT} from '../helpers/auth';
import {registerRequest, loginRequest} from '../helpers/auth';
import {history} from '../index'

const apiUrl = process.env.REACT_APP_API_URL;

export function register(data) {

    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

       registerRequest(data)
        .then(response => {
             dispatch({type: "REGISTER_SUCCES", response, userId: response._id });
             history.push('/login');
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}


export function login (data) {
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

       loginRequest(data)
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

        request(`${apiUrl}/user/sign-out`, "POST", {jwt: getJWT()})
        .then(() => {
            localStorage.removeItem('token');
             dispatch({type: "LOGOUT_SUCCES" });
             history.push('/login')
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}

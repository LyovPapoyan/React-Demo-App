import request from '../helpers/request';
import {getJWT} from '../helpers/auth';
import {registerRequest, loginRequest, postForm} from '../helpers/auth';
import {history} from '../index'

const apiUrl = process.env.REACT_APP_API_URL;

export function register(data) {

    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

       registerRequest(data)
        .then(response => {
             dispatch({type: "REGISTER_SUCCES", response });
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

    return async (dispatch) => {

        dispatch({type: "AUTH_LOADING"});

        const jwt = getJWT()
        if(jwt) {
            request(`${apiUrl}/user/sign-out`, "POST", {jwt: await jwt})   
            .then(() => {
                localStorage.removeItem('token');
                 dispatch({type: "LOGOUT_SUCCES" });
                 history.push('/login')
            })
            .catch(err => {
                dispatch({type: "AUTH_FAILED", error: err.message})
            })
        } else {
            dispatch({type: "LOGOUT_SUCCES" });
            history.push('/login')
        }
       
      
    }
   
}


export function getUserInfo () {
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

       request(`${apiUrl}/user`)
        .then(data => {
             dispatch({type: "GET_USERINFO_SUCCES", userInfo: data });
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}


export function postContactForm (data) {
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

       postForm(data)
        .then(response => {
             dispatch({type: "CONTACT_FORM_SUCCES" })
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
        
    }
   
}
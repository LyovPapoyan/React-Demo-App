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
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}

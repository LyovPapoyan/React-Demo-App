import request from '../helpers/request';

const apiUrl = process.env.REACT_APP_API_URL;

export function getTask(taskId) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task/${taskId}`)
        .then(task => {
            dispatch({type: "GET_TASK_SUCCES", task})
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}


export function getTasks(params= {}) {
 
    let url = `${apiUrl}/task`;

    let query = '?';

    for (let key in params) {
        query += `${key}=${params[key]}&`
    }

    if(query !== '?') {
        url += query;
    }

    return (dispatch) => {

        dispatch({type: "LOADING"})
        
        request(url)        
        .then(tasks => {
            dispatch({type: "GET_TASKS_SUCCES", tasks})
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}


export function addTask(data) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task`, "POST", data)
        .then(task => {
            dispatch({type: "ADD_TASK_SUCCES", task})
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }

}


export function editTask(taskId, data, from) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task/${taskId}`, 'PUT', data)
        .then(editedTask => {
            dispatch({type: "EDIT_TASK_SUCCES", editedTask, from})
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}


export function changeTaskStatus(taskId, data, from='tasks') {
    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task/${taskId}`, 'PUT', data, from)
        .then(editedTask => {
            dispatch({type: "CHANGE_TASK_STATUS_SUCCES", editedTask, status: data.status, from})
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}


export function removeTask(taskId, from='tasks') {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task/${taskId}`, "DELETE")
        .then(() => {
            dispatch({type: "REMOVE_TASK_SUCCES", taskId, from} )
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}



export function removeTasks(data) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task`, "PATCH", data)
        .then(() => {
            dispatch({type: "REMOVE_TASKS_SUCCES", taskIds: data.tasks} )
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }

}


export function logout () {
    return (dispatch) => {

        dispatch({type: "AUTH_LOADING"})

        const token = localStorage.getItem('token');
        const parsed = JSON.parse(token).jwt;
        console.log('url======== ' + apiUrl);
        request(`${apiUrl}/user/sign-out`, "POST", {jwt: parsed})
        .then(() => {
            localStorage.removeItem('token');
             dispatch({type: "LOGOUT_SUCCES" });
            //  history.push('/login')
        })
        .catch(err => {
            dispatch({type: "AUTH_FAILED", error: err.message})
        })
    }
   
}
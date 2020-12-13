import request from '../request';

const apiUrl = process.env.REACT_APP_API_URL;

export function getTask(taskId) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task/${taskId}`)
        .then(task => {
            console.log(task)
            dispatch({type: "GET_TASK_SUCCES", task})
        })
        .catch(err => {
            dispatch({type: "TASK_FAILED", error: err.message})
        })
    }
   
}


export function getTasks() {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`${apiUrl}/task`)
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
import request from '../request';

export function getTasks() {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request("http://localhost:3001/task")
        .then(tasks => {
            dispatch({type: "GET_TASKS_SUCCES", tasks})
        })
        .catch(err => {
            dispatch({type: "GET_TASKS_FAILED", error: err.message})
        })
    }

   
}


export function addTask(data) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request("http://localhost:3001/task", "POST", {})
        .then(task => {
            dispatch({type: "ADD_TASK_SUCCES", task})
        })
        .catch(err => {
            dispatch({type: "ADD_TASK_FAILED", error: err.message})
        })
    }

   
}


export function editTask(taskId, data) {

    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(`http://localhost:3001/task/${taskId}`, 'PUT', data)
        .then(editedTask => {
            dispatch({type: "EDIT_TASK_SUCCES", editedTask})
        })
        .catch(err => {
            dispatch({type: "EDIT_TASK_FAILED", error: err.message})
        })
    }

   
}
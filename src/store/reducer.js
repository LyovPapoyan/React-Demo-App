const defaultState = {
    tasks: [],
    loading: false, 
    error: null,
    addTaskSuccess: false,
    successMessage: null
}

export const mainReducer = (state = defaultState, action) => {
    switch(action.type) {

      case "LOADING": {
        return {
          ...state,
          loading: true,
          addTaskSuccess: false,
          successMessage: null,
          error: null
        }
      }

      case "GET_TASKS_SUCCES": {
      return {
        ...state,
        loading: false,
        tasks: action.tasks
      }
    }

      case "GET_TASKS_FAILED": {
        return {
          ...state,
          loading: false,
          error: action.error
        }
      }


      case "EDIT_TASK_SUCCES": {

        const tasks = [state.tasks];
        const foundIndex = tasks.findIndex(el => el._id === action.editedTask._id);
        tasks[foundIndex] = action.editedTask;

        return {
          ...state,
          loading: false,
          tasks: tasks
        }
      }

      case "EDIT_TASK_FAILED": {
        return {
          ...state,
          loading: false,
          error: action.error
        }
      }


      case "ADD_TASK_SUCCES": {
        return {
          ...state,
          loading: false,
          tasks: [...state.tasks, action.task],
          addTaskSuccess: true,
          successMessage: "Task added successfully"
        }
      }

      case "ADD_TASK_FAILED": {
        return {
          ...state,
          loading: false,
          error: action.error
        }
      }


      default: return state;
    }
}
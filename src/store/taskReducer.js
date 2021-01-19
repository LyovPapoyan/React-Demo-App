

const defaultState = {
  tasks: [],
  task: null,
  loading: false,
  error: null,
  addTaskSuccsess: false,
  removeTasksSuccsess: false,
  removeTaskSuccsess: false,
  editTaskSuccsess: false,
  successMessage: null,
}

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {

    case "LOADING": {
      return {
        ...state,
        loading: true,
        addTaskSuccsess: false,
        removeTasksSuccsess: false,
        editTaskSuccsess: false,
        successMessage: null,
        error: null
      }
    }

    case "TASK_FAILED": {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case "GET_TASK_SUCCES": {
      return {
        ...state,
        loading: false,
        task: action.task
      }
    }

    case "GET_TASKS_SUCCES": {
      return {
        ...state,
        loading: false,
        tasks: action.tasks
      }
    }

    case "CHANGE_TASK_STATUS_SUCCES": {

      let message;

      if (action.status === 'done') {
        message = "Congratulation, you have completed the task!!!"
      } else {
        message = "The task is active now!!!"
      }

      if (action.from === 'single') {
        return {
          ...state,
          loading: false,
          task: action.editedTask,
          successMessage: message
        }
      } else {

        const tasks = [...state.tasks];
        const foundIndex = tasks.findIndex(el => el._id === action.editedTask._id);
        tasks[foundIndex] = action.editedTask;

        return {
          ...state,
          loading: false,
          tasks: tasks,
          successMessage: message
        }
      }
    }


    case "EDIT_TASK_SUCCES": {

      if (action.from === 'single') {
        return {
          ...state,
          loading: false,
          editTaskSuccsess: true,
          task: action.editedTask,
          successMessage: "Task edited successfully"
        }
      } else {

        const tasks = [...state.tasks];
        const foundIndex = tasks.findIndex(el => el._id === action.editedTask._id);
        tasks[foundIndex] = action.editedTask;

        return {
          ...state,
          loading: false,
          editTaskSuccsess: true,
          tasks: tasks,
          successMessage: "Task edited successfully"
        }
      }
    }


    case "ADD_TASK_SUCCES": {
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.task],
        addTaskSuccsess: true,
        successMessage: "Task added successfully"
      }
    }


    case "REMOVE_TASK_SUCCES": {

      if (action.from === 'single') {
        return {
          ...state,
          loading: false,
          task: null,
          removeTaskSuccsess: true,
          successMessage: "Task removed successfully"
        }
      } else {
        const newTasks = state.tasks.filter((item) => action.taskId !== item._id);
        return {
          ...state,
          loading: false,
          tasks: newTasks,
          successMessage: "Task removed successfully"
        }
      }
    }


    case "REMOVE_TASKS_SUCCES": {
      let tasks = [...state.tasks]

      for (const checkTaskId of action.taskIds) {
        tasks = tasks.filter(task => task._id !== checkTaskId)
      };
      return {
        ...state,
        loading: false,
        tasks: tasks,
        removeTasksSuccsess: true,
        successMessage: "Tasks removed successfully"
      }
    }


    case "LOGOUT_SUCCES": {
      return {
        ...state,
        loading: false,
        error: null
      }
    }

    default: return state;
  }
}
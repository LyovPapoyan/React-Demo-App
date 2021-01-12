const defaultState = { 
  authLoading: false,
  error: null,
  userId: null,
  authSuccessMessage: null,
  registerSuccses: false
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case "AUTH_LOADING": {
      return {
        ...state,
        authLoading: true,
        successMessage: null,
        error: null
      }
    }

    case "TASK_FAILED": {
      return {
        ...state,
        authLoading: false,
        error: action.error
      }
    }

    case "REGISTER_SUCCES": {
      return {
      ...state,
      authLoading: false,
      registerSuccses: true,
      authSuccessMessage: 'You have succsesfully registration' 
    }
  }

    default: return state;
  }
}
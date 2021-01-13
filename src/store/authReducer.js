const defaultState = { 
  authLoading: false,
  authError: null,
  userId: null,
  authSuccessMessage: null,
  registerSuccses: false,
  isAuth: false
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case "AUTH_LOADING": {
      return {
        ...state,
        authLoading: true,
        successMessage: null,
        authError: null
      }
    }

    case "AUTH_FAILED": {
      return {
        ...state,
        authLoading: false,
        authError: action.error
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

    case "LOGIN_SUCCES": {
      return {
      ...state,
      authLoading: false, 
      isAuth: true
    }
  }

    default: return state;
  }
}
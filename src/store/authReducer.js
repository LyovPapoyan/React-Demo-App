function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if(!token) {
    return false;
  } else {
    // stugel jamket@
    return true;
  }
}

const defaultState = { 
  authLoading: false,
  authError: null,
  userId: null,
  authSuccessMessage: null,
  registerSuccses: false,
  isAuth: checkLoginStatus()
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case "AUTH_LOADING": {
      return {
        ...state,
        authLoading: true,
        authSuccessMessage: null,
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

    case "LOGOUT_SUCCES": {
      return {
      ...state,
      authLoading: false, 
      isAuth: false
    }
  }

    default: return state;
  }
}
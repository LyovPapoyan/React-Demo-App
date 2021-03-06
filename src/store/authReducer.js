function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  } else {
    return true;
  }
}

const defaultState = {
  authLoading: false,
  authError: null,
  authSuccessMessage: null,
  registerSuccses: false,
  isAuth: checkLoginStatus(),
  userInfo: null,
  contactResponseSuccses: null
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
        authSuccessMessage: 'You have succsesfully registration',
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
        isAuth: false,
        authError: null,
        userInfo: null
      }
    }

    case "GET_USERINFO_SUCCES": {
      return {
        ...state,
        authLoading: false,
        userInfo: action.userInfo
      }
    }

    case "CONTACT_FORM_SUCCES" : {
      return {
        ...state,
        authLoading: false,
        authError: null,
        authSuccessMessage: "We will contact you"
      }
    }

    default: return state;
  }
}
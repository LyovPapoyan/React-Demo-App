const defaultState = {
    count: 20
}

export const mainReducer = (state = defaultState, action) => {
    switch(action.type) {
      case "CHANGE_COUNT": {
      return {
        ...state,
        count: state.count + action.value
      }
      }
      default: return state;
    }
}
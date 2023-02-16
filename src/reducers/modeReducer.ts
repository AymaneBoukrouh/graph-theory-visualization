const initialState = {
  mode: 'node'
}

const modeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload
      }
    default:
      return state
  }
}

export default modeReducer;

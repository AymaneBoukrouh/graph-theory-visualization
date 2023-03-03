const initialState = {
  algorithm: 'bellman-ford'
}

export const algorithmReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ALGORITHM':
      return {
        ...state,
        algorithm: action.payload
      }
    default:
      return state
  }
}

const initialState = {
  editorMode: 'node'
}

export const modeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_EDITOR_MODE':
      return {
        ...state,
        editorMode: action.payload
      }
    default:
      return state
  }
}

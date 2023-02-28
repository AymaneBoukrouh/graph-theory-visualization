import { Coords, Node } from '@/types';

const initialState = {
  mouseCoords: { x: -1, y: -1 } as Coords,
  isDragging: false,
  draggingNode: null,
  isEdgeSelected: false,
  selectedEdge: null
}

export const mouseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_MOUSE_COORDS':
      return { ...state, mouseCoords: action.payload }
    case 'SET_IS_DRAGGING':
      return { ...state, isDragging: action.payload }
    case 'SET_DRAGGING_NODE':
      return { ...state, draggingNode: action.payload }
    case 'SET_IS_EDGE_SELECTED':
      return { ...state, isEdgeSelected: action.payload, selectedEdge: action.payload === true ? state.selectedEdge : null }
    case 'SET_SELECTED_EDGE':
      return { ...state, selectedEdge: action.payload }
    default:
      return state
  }
}

import { Coords } from '@/types';

interface GridState {
  gridSize: Coords;
  cellSize: number;
  scale: number;
  minScale: number;
  maxScale: number;
  isGridDragging: boolean;
  offset: Coords;
  ratio: number;
}

const initialState: GridState = {
  gridSize: { x: 50, y: 50 },
  cellSize: 10,
  scale: 2,
  minScale: 1, // TODO: move these to constants
  maxScale: 5,
  isGridDragging: false,
  offset: { x: 0, y: 0 },
  ratio: 1 // used to make minimap calculations, it is updated in the Grid component
}

export const gridReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_GRID_SIZE':
      return {
        ...state,
        gridSize: action.payload
      }
    case 'SET_CELL_SIZE':
      return {
        ...state,
        cellSize: action.payload
      }
    case 'SET_GRID_SCALE':
      return {
        ...state,
        scale: action.payload
      }
    case 'SET_IS_GRID_DRAGGING':
      return {
        ...state,
        isGridDragging: action.payload
      }
    case 'SET_GRID_OFFSET':
      return {
        ...state,
        offset: action.payload
      }
    case 'SET_GRID_RATIO':
      return {
        ...state,
        ratio: action.payload
      }
    default:
      return state
  }
}

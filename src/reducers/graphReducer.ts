import { Graph, Node, Edge } from '@/types';

const initialState = {
  graph: {
    nodes: [] as Node[],
    edges: [] as Edge[]
  } as Graph
}

export const graphReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_GRAPH':
        return {
          ...state,
          graph: action.payload
        }
    case 'SET_NODES':
      return {
        ...state,
        graph: {
          ...state.graph,
          nodes: action.payload
        }
      }
    case 'SET_EDGES':
      return {
        ...state,
        graph: {
          ...state.graph,
          edges: action.payload
        }
      }
    default:
      return state
  }
}

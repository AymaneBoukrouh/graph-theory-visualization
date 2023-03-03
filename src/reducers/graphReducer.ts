import { Graph, Node, Edge } from '@/types';

/*const initialState = {
  graph: {
    nodes: [] as Node[],
    edges: [] as Edge[]
  } as Graph
}*/
// test
const nodes = [
  { label: 'A', coords: { x: 7*35, y: 5*35 } },
  { label: 'B', coords: { x: 7*35, y: 10*35 } },
  { label: 'C', coords: { x: 10*35, y: 10*35 } },
  { label: 'D', coords: { x: 13*35, y: 10*35 } },
  { label: 'E', coords: { x: 13*35, y: 5*35 } },
  { label: 'F', coords: { x: 10*35, y: 5*35 } },
]

const edges = [
  { source: nodes[0], target: nodes[1], weight: 3 },
  { source: nodes[0], target: nodes[2], weight: 4 },
  { source: nodes[0], target: nodes[5], weight: 7 },
  { source: nodes[1], target: nodes[2], weight: 4 },
  { source: nodes[2], target: nodes[3], weight: 9 },
  { source: nodes[2], target: nodes[4], weight: 9 },
  { source: nodes[2], target: nodes[5], weight: 1 },
  { source: nodes[3], target: nodes[4], weight: 5 }
]

const initialState = {
  graph: {
    nodes: nodes as Node[],
    edges: edges as Edge[]
  } as Graph
}
// end test

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

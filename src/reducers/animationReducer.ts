import { Node, Edge } from '@/types';

interface AnimationState {
  isAnimating: boolean;
  duration: number; // in milliseconds
}

const initialState = {
  animatedEdge: null,
  duration: 2000
};

export const animationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ANIMATE_EDGE':
      return {
        ...state,
        animatedEdge: action.payload
      }
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload
      }
    default:
      return state
  }
}

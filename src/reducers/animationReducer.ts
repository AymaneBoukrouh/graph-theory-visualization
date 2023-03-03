import { Node, Edge } from '@/types';

interface AnimationState {
  isAnimating: boolean;
}

const initialState = {
  animatedEdge: null
};

export const animationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ANIMATE_EDGE':
      return {
        ...state,
        animatedEdge: action.payload
      }
    default:
      return state
  }
}

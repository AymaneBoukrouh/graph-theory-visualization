import { useDispatch } from 'react-redux';

export const useAnimation = () => {
  const dispatch = useDispatch();

  const animateEdges = (edgesToAnimate: { edge: Edge, color: string }[]) => {
    edgesToAnimate.forEach((edgeToAnimate, index) => {
      setTimeout(() => {
        dispatch({
          type: 'ANIMATE_EDGE',
          payload: edgeToAnimate
        })
      }, 2100 * index);
    });
  }

  return { animateEdges };
}
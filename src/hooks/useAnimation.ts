import { useSelector, useDispatch } from 'react-redux';

export const useAnimation = () => {
  const { duration } = useSelector((state: any) => state.animation);
  const delay = Math.floor(duration / 10);

  const dispatch = useDispatch();

  const animateEdges = (edgesToAnimate: { edge: Edge, color: string }[]) => {
    edgesToAnimate.forEach((edgeToAnimate, index) => {
      setTimeout(() => {
        dispatch({
          type: 'ANIMATE_EDGE',
          payload: edgeToAnimate
        })
      }, (duration + delay) * index);
    });
  }

  return { animateEdges };
}

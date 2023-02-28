import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useMouseEnter = () => {
  const dispatch = useDispatch();

  const onMouseEnter = useCallback((event: React.MouseEvent) => {
    dispatch({ // TODO: don't multiply by 35, make dynamic
      type: 'SET_MOUSE_COORDS',
      payload: {
        x: parseInt(event.currentTarget.dataset.x as string) * 35,
        y: parseInt(event.currentTarget.dataset.y as string) * 35
      }
    });
  }, [dispatch]);

  return onMouseEnter;
}

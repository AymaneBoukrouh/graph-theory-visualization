import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';

export const useResizeHandler = () => {
  // get redux state
  const { editorMode } = useSelector((state: RootState) => state.mode);
  const { scale, minScale, maxScale } = useSelector((state: RootState) => state.grid);

  const dispatch = useDispatch();

  const handleResize = useCallback((event: React.MouseEvent) => {
    // only resize in grid mode
    if (editorMode !== 'grid')
      return;

    // calculate scale
    const delta = Math.sign(event.deltaY);
    const newScale = scale + delta * .1;

    // update scale
    dispatch({
      type: 'SET_GRID_SCALE',
      payload: Math.min(Math.max(newScale, minScale), maxScale)
    })
  }, [editorMode, scale, minScale, maxScale, dispatch]);

  return handleResize;
}

import { useResizeHandler } from './useResizeHandler';
import { useMouseDownHandler } from './useMouseDownHandler';
import { useMouseMoveHandler } from './useMouseMoveHandler';
import { useMouseUpHandler } from './useMouseUpHandler';

export const useEventHandlers = () => {
  const handleResize = useResizeHandler();
  const handleMouseDown = useMouseDownHandler();
  const handleMouseMove = useMouseMoveHandler();
  const handleMouseUp = useMouseUpHandler();

  return { handleResize, handleMouseDown, handleMouseMove, handleMouseUp };
}

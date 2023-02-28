import { useSelector, useDispatch } from 'react-redux';
import { useGraph } from '@/hooks/useGraph';
import { useMouseEnter } from '@/hooks/useMouseEvents/useMouseEnter';
import { useMouseMove } from '@/hooks/useMouseEvents/useMouseMove';
import { useMouseDown } from '@/hooks/useMouseEvents/useMouseDown';
import { useMouseUp } from '@/hooks/useMouseEvents/useMouseUp';

interface MouseEvents {
  onMouseEnter: (event: React.MouseEvent) => void;
}

export const useMouseEvents = (): MouseEvents => {
  const dispatch = useDispatch();

  const onMouseEnter = useMouseEnter();
  const onMouseMove = useMouseMove();
  const onMouseDown = useMouseDown();
  const onMouseUp = useMouseUp();

  return { onMouseEnter, onMouseMove, onMouseDown, onMouseUp }
}

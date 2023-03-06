import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGraph } from '@/hooks/useGraph';
import { useMouseEvents } from '@/hooks/useMouseEvents';
import { Grid as Gridd } from './Grid';
import { useEventHandlers } from './eventHandlers';

export const Grid = () => {
  // TODO: limit grid dragging edges..
  // TODO: slider for zooming
  
  const { handleResize, handleMouseMove, handleMouseUp } = useEventHandlers();

  const dispatch = useDispatch();

  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { width, height } = grid.current.getBoundingClientRect();
    dispatch({ type: 'SET_GRID_RATIO', payload: width / height });
  }, []);

  return (
    <div
      ref = {grid}
      id = "grid-container"
      className = "position-relative border rounded-3 overflow-hidden"
      style = {{ height: '75%', width: '75%', borderColor: 'rgba(0, 0, 0, .1)' }}
      onWheel = {handleResize}
      onMouseUp = {handleMouseUp}
      onMouseMove = {handleMouseMove}
    >
      <Gridd />
      <div className="position-absolute top-0 end-0 bg-dark" style={{ width: '200px', height: '200px' }}>
        <Gridd mini={true} />
      </div>
    </div>
  );
};

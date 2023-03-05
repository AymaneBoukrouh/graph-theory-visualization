import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGraph } from '@/hooks/useGraph';
import { useMouseEvents } from '@/hooks/useMouseEvents';
import { Grid as Gridd } from './Grid';
import { Edges, Edge } from './Edges';
import { Nodes } from './Nodes';
import { useEventHandlers } from './eventHandlers';

export const Grid = () => {
  // TODO: limit grid dragging edges..
  // TODO: slider and minimap

  const { graph } = useSelector((state: any) => state.graph);
  const { gridSize, cellSize, scale, offset } = useSelector((state: any) => state.grid);

  const {
    isEdgeSelected,
    selectedEdge
   } = useSelector((state: any) => state.mouse);


  const [width, height] = [gridSize.x * cellSize, gridSize.y * cellSize];

  const { handleResize, handleMouseDown, handleMouseMove, handleMouseUp } = useEventHandlers();

  return (
    <div
      className = "border rounded-3 overflow-hidden"
      style = {{ height: '75%', width: '75%', borderColor: 'rgba(0, 0, 0, .1)' }}
      onWheel = {handleResize}
      onMouseUp = {handleMouseUp}
      onMouseMove = {handleMouseMove}
    >
      <svg
        id="svg-grid"
        viewBox = {`${offset.x} ${offset.y} ${width} ${height}`}
        transform = {`scale(${scale})`}
        onMouseDown = { handleMouseDown }
      >
        <Gridd />
        <Edges />
        <Nodes />
        { isEdgeSelected && <Edge edge={selectedEdge} /> }
      </svg>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEventHandlers } from './eventHandlers';
import { Edges, Edge } from './Edges';
import { Nodes } from './Nodes';

interface GridProps {
  mini: boolean;
}

export const Grid = ({ mini = false }: GridProps) => {
  const { graph } = useSelector((state: any) => state.graph);
  const { gridSize, cellSize, scale, offset, ratio } = useSelector((state: any) => state.grid);

  const {
    isEdgeSelected,
    selectedEdge
   } = useSelector((state: any) => state.mouse);



  const [width, height] = [gridSize.x * cellSize, gridSize.y * cellSize];

  const { handleMouseDown } = useEventHandlers();


  const [miniWidth, setMiniWidth] = useState(0);
  const [miniHeight, setMiniHeight] = useState(0);
  const [miniOffset, setMiniOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMiniWidth(width / scale);
    setMiniHeight((height / scale) / ratio);
  }, [scale, width, height, ratio]);


  useEffect(() => {
    const miniOffset = {
      x: offset.x + (width - miniWidth) / 2,
      y: offset.y + (height - miniHeight*ratio) / 2
    }

    setMiniOffset(miniOffset);
  }, [miniWidth, miniHeight, offset, width, height, ratio]);

  return (
    <svg
        id="svg-grid"
        viewBox = { mini ? `0 0 ${width} ${height}` : `${offset.x} ${offset.y} ${width} ${height}`}
        transform = { mini ?  '' : `scale(${scale})`}
        onMouseDown = { handleMouseDown }
      >
        <rect x="0" y="0" width={width} height={height} fill="white" />
        {Array.from(Array(gridSize.x+1).keys()).map((x) => {
          return (
            <line
              x1={ x*cellSize } y1="0" x2={x * cellSize} y2={height}
              stroke="black" strokeWidth=".01"
              key={`vline-${x}`}
            />
          );
        })}
        {Array.from(Array(gridSize.y+1).keys()).map((y) => {
          return (
            <line
              x1="0" y1={y * cellSize} x2={width} y2={y * cellSize}
              stroke="black" strokeWidth=".01"
              key={`hline-${y}`}
            />
          );
        })}
        <Edges />
        <Nodes />
        { isEdgeSelected && <Edge edge={selectedEdge} /> }
        { mini &&
          <rect
            x = {miniOffset.x} y = {miniOffset.y}
            width = {miniWidth} height = {miniHeight}
            fill = "none" stroke = "black" strokeWidth = ".5"
          />
        }
        {
          mini &&
          <rect
            x='0' y='0'
            width={width} height={height}
            fill="none" stroke="black" strokeWidth=".2"
          />
        }
      </svg>
  )
}
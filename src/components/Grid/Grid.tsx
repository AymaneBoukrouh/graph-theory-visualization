import { useSelector } from 'react-redux';

export const Grid = () => {
  const { gridSize, cellSize } = useSelector((state: any) => state.grid);

  const [width, height] = [gridSize.x * cellSize, gridSize.y * cellSize];

  return (
    <g>
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
  </g>
  )
}
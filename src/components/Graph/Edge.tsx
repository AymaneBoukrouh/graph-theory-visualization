interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const Edge = ({ x1, y1, x2, y2 }: EdgeProps) => {
  const length = Math.sqrt((y1 - y2) * (y1 - y2) + (x1 - x2) * (x1 - x2));
  const angle = Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;

  return (
    <svg
      viewBox={`0 0 ${length} 1`}
      style={{
        position: 'absolute',
        top: `${x1 + 17.5}px`,
        left: `${y1 + 17.5}px`,
        width: `${length}px`,
        height: '3px',
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
      }}
    >
      <line
        x1="0"
        y1="0"
        x2={length}
        y2="0"
        stroke="red"
        strokeWidth="100"
      />
      {/*weight*/}
    </svg>
  );
};
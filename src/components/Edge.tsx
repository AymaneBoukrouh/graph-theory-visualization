interface EdgeProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const Edge = ({ x1, y1, x2, y2 }: EdgeProps) => {
  const length = Math.sqrt((y1 - y2) * (y1 - y2) + (x1 - x2) * (x1 - x2));
  const angle = Math.atan2(x2 - x1, y2 - y1) * 180 / Math.PI;
  return <div className="d-flex justify-content-center edge" style={{
    position: 'absolute',
    top: `${x1+17.5}px`,
    left: `${y1+17.5}px`,
    width: `${length}px`,
    height: '1px',
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0 0',
    backgroundColor: 'red'
  }}>
    <div style={{
      transform: `rotate(-${angle}deg)`,
      transformOrigin: '0 0',
      width: 'fit-content',
    }}>
      5
    </div>
  </div>;
};

export default Edge;

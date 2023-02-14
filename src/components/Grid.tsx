import { useState, useEffect } from 'react';
import './Grid.css';
import Line from './Line';

interface GridProps {
  editorMode: string;
}

interface Coords {
  x: number;
  y: number;
}

const Grid = ({ editorMode }: GridProps) => {
  // grid
  const [gridX, setGridX] = useState<number>(0);
  const [gridY, setGridY] = useState<number>(0);
  const [currentCoords, setCurrentCoords] = useState<Coords>({x: -1, y: -1} as Coords);

  // line
  const [selectedLineStartCoords, setSelectedLineStartCoords] = useState<Coords>({x: -1, y: -1} as Coords);
  const [selectedLineEndCoords, setSelectedLineEndCoords] = useState<Coords>({x: -1, y: -1} as Coords);
  const [selectedLineIndex, setSelectedLineIndex] = useState<number>(-1);
  const [isLineSelected, setIsLineSelected] = useState<boolean>(false);
  const [lines, setLines] = useState<any>([] as any[]); // TODO: use Line instead of any

  // mouse
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCurrentCoords({ // TODO: don't multiply by 35, make dynamic
      x: parseInt(e.currentTarget.dataset.x as string)*35,
      y: parseInt(e.currentTarget.dataset.y as string)*35
    } as Coords);
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Editor Mode: NODE
    if (editorMode === 'node') {
      if (e.currentTarget.classList.contains('has-node'))
        return;
      
      const node = document.createElement('div');
      node.classList.add('cell-node');
      e.currentTarget.appendChild(node);
      e.currentTarget.classList.add('has-node');
    }

    // Editor Mode: LINE
    else if (editorMode === 'line') {
      if (!e.currentTarget.classList.contains('has-node'))
        return;

      if (isLineSelected) {
        if (selectedLineStartCoords != selectedLineEndCoords) {
          setSelectedLineEndCoords(currentCoords)
          setIsLineSelected(false);
        }
      } else {
        setSelectedLineIndex(selectedLineIndex+1);
        setSelectedLineStartCoords(currentCoords);
        setSelectedLineEndCoords(currentCoords);
        setIsLineSelected(true);
      }
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (editorMode === 'line' && isLineSelected) {
      // get mouse position within grid
      const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;
      const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top;

      setSelectedLineEndCoords({x: mouseY-17.5, y: mouseX-17.5} as Coords);
    }
  }

  useEffect (() => {
    setGridX(20);
    setGridY(35);
  }, []);

  useEffect(() => {
    if (selectedLineIndex === -1)
      return;

    const [x1, y1] = [selectedLineStartCoords.x, selectedLineStartCoords.y];
    const [x2, y2] = [selectedLineEndCoords.x, selectedLineEndCoords.y];
    lines[selectedLineIndex] = <Line x1={x1} y1={y1} x2={x2} y2={y2} key={selectedLineIndex} />;
    setLines([...lines]);
  }, [selectedLineStartCoords, selectedLineEndCoords]);
  
  return (
    <div className="grid position-relative" id="grid" onMouseMove={onMouseMove}>
      {
        Array.from(Array(gridX).keys()).map((x) => {
          return <div className="grid-row" key={x}>
            {
              Array.from(Array(gridY).keys()).map((y) => {
                return <div
                  className     = "grid-cell position-relative"
                  data-x        = {x}
                  data-y        = {y}
                  onMouseEnter  = {onMouseEnter}
                  onMouseDown   = {onMouseDown}
                  key           = {`${x}-${y}`}
                ></div>
              })
            }
          </div>
        })
      } 
      {lines}
    </div>
  )
}

export default Grid;

import { useState, useEffect } from 'react';
import './Grid.css';

const Grid = () => {
  const [gridX, setGridX] = useState<number>(0);
  const [gridY, setGridY] = useState<number>(0);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.currentTarget.classList.contains('has-node'))
      e.currentTarget.classList.add('bg-light');
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.currentTarget.classList.contains('has-node'))
      e.currentTarget.classList.remove('bg-light');
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget.classList.contains('has-node')) {
      e.currentTarget.innerHTML = '';
      e.currentTarget.classList.remove('has-node');

      return;
    }

    e.currentTarget.classList.add('has-node');
    e.currentTarget.classList.remove('bg-light');

    // add element to inside of cell
    const element = document.createElement('div');
    element.classList.add('cell-node');
    e.currentTarget.appendChild(element);
  }

  useEffect (() => {
    setGridX(20);
    setGridY(35);
  }, []);

  return (
    <div className="grid">
      {
        Array.from(Array(gridX).keys()).map((x) => {
          return <div className="grid-row">
            {
              Array.from(Array(gridY).keys()).map((y) => {
                return <div
                  className     = "grid-cell position-relative"
                  data-x        = {x}
                  data-y        = {y}
                  onMouseEnter  = {onMouseEnter}
                  onMouseLeave  = {onMouseLeave}
                  onMouseDown   = {onMouseDown}
                ></div>
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default Grid;

import { useState, useEffect } from 'react';
import './App.css';

function App() {
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
    const cell = e.currentTarget;
    const cellX = cell.getAttribute('data-x');
    const cellY = cell.getAttribute('data-y');
    const cellWidth = cell.clientWidth;
    const cellHeight = cell.clientHeight;

    const element = document.createElement('div');
    element.classList.add('cell-node');
    cell.appendChild(element);
  }

  useEffect (() => {
    setGridX(20);
    setGridY(35);
  }, []);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;

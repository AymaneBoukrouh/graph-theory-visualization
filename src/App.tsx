import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gridX, setGridX] = useState<number>(0);
  const [gridY, setGridY] = useState<number>(0);

  useEffect (() => {
    setGridX(10);
    setGridY(10);
  }, [])

  return (
    <div className="App">
      <div className="grid">
        {
          Array.from(Array(gridX).keys()).map((x) => {
            return <div className="grid-row">
              {
                Array.from(Array(gridY).keys()).map((y) => {
                  return <div className="grid-cell"></div>
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

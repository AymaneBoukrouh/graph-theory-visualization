import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMouseEvents } from '@/hooks/useMouseEvents';
import { Node, Edge } from '@/components/Graph';
import './index.css';

export const Grid = () => {
  // get redux state
  const { isEdgeSelected, selectedEdge } = useSelector((state: any) => state.mouse);
  const { graph } = useSelector((state: any) => state.graph);

  // get redux dispatch
  const dispatch = useDispatch();

  // mouse events handlers
  const { onMouseEnter, onMouseDown, onMouseMove, onMouseUp } = useMouseEvents();

  // initialize the grid
  const [gridX, setGridX] = useState<number>(0);
  const [gridY, setGridY] = useState<number>(0);
  
  useEffect (() => {
    setGridX(20);
    setGridY(35);
  }, []);
  
  return (
    <div className="grid position-relative" id="grid" onMouseMove={onMouseMove}>
      {
        Array.from(Array(gridX).keys()).map((x) => {
          return <div className="grid-row" key={x}>
            {
              Array.from(Array(gridY).keys()).map((y) => {
                return <div
                  className     = "grid-cell position-relative"
                  data-x        = { x }
                  data-y        = { y }
                  onMouseEnter  = { onMouseEnter }
                  onMouseDown   = { onMouseDown }
                  onMouseUp     = { onMouseUp }
                  key           = { `${x}-${y}` }
                ></div>
              })
            }
          </div>
        })
      }

      { /** The graph nodes and edges are rendered separately */ }
      { graph.nodes.map((node, index) => {
          return <Node label={node.label} coords={node.coords} key={index} />
        })
      }
      { graph.edges.map((edge, index) => {
          return <Edge
            x1 = {edge.source.coords.x}
            y1 = {edge.source.coords.y}
            x2 = {edge.target.coords.x}
            y2 = {edge.target.coords.y}
            weight = {edge.weight}
            key = {index}
          />
        })
      }

      { /** This edge is shown during the creation of a new edge
         * It is not part of the graph, but a temporary edge 
         */ }
      { isEdgeSelected &&
        <Edge
          x1 = { selectedEdge.source.coords.x }
          y1 = { selectedEdge.source.coords.y }
          x2 = { selectedEdge.target.coords.x }
          y2 = { selectedEdge.target.coords.y }
        />
      }
    </div>
  )
}

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Grid.css';
import Graph from '../types/Graph';
import Node from './Node';
import Edge from './Edge';
import Coords from '../types/Coords';
import { useGraph } from '../hooks/useGraph';

interface GridProps {
  graph: Graph;
  setGraph: (graph: Graph) => void;
}

const Grid = ({ graph, setGraph }: GridProps) => {
  const editorMode = useSelector((state: any) => state.mode.mode);
  const { addNode, removeNode } = useGraph({ graph, setGraph });

  // grid
  const [gridX, setGridX] = useState<number>(0);
  const [gridY, setGridY] = useState<number>(0);
  const [currentCoords, setCurrentCoords] = useState<Coords>({x: -1, y: -1} as Coords);

  // node
  const [nodes, setNodes] = useState<any>([] as any[]); // TODO: use Node instead of any

  // edge
  const [selectedEdgeStartCoords, setSelectedEdgeStartCoords] = useState<Coords>({x: -1, y: -1} as Coords);
  const [selectedEdgeEndCoords, setSelectedEdgeEndCoords] = useState<Coords>({x: -1, y: -1} as Coords);
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState<number>(-1);
  const [isEdgeSelected, setIsEdgeSelected] = useState<boolean>(false);
  const [edges, setEdges] = useState<any>([] as any[]); // TODO: use Edge instead of any

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
      addNode(currentCoords);

      //const node = Node({coords: currentCoords, label: String.fromCharCode(65+nodes.length)});
      //setNodes([...nodes, node]);
    }

    // Editor Mode: EDGE
    else if (editorMode === 'edge') {
      //if (!e.currentTarget.classList.contains('has-node'))
      //  return;

      if (isEdgeSelected) {
        if (selectedEdgeStartCoords != selectedEdgeEndCoords) {
          setSelectedEdgeEndCoords(currentCoords)
          setIsEdgeSelected(false);
        }
      } else {
        setSelectedEdgeIndex(selectedEdgeIndex+1);
        setSelectedEdgeStartCoords(currentCoords);
        setSelectedEdgeEndCoords(currentCoords);
        setIsEdgeSelected(true);
      }
    }

    // Editor Mode: DELETE
    else if (editorMode === 'delete') {
      removeNode(currentCoords);
    }
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (editorMode === 'edge' && isEdgeSelected) {
      // get mouse position within grid
      const mouseX = e.clientX - e.currentTarget.getBoundingClientRect().left;
      const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top;

      setSelectedEdgeEndCoords({x: mouseY-17.5, y: mouseX-17.5} as Coords);
    }
  }

  useEffect (() => {
    setGridX(20);
    setGridY(35);
  }, []);

  useEffect(() => {
    const newNodes = graph.nodes.map((node, index) => {
      return <Node coords={node.coords} label={node.label} key={index} />
    });
    
    setNodes(newNodes);
  }, [graph]);

  useEffect(() => {
    if (selectedEdgeIndex === -1)
      return;

    const [x1, y1] = [selectedEdgeStartCoords.x, selectedEdgeStartCoords.y];
    const [x2, y2] = [selectedEdgeEndCoords.x, selectedEdgeEndCoords.y];
    edges[selectedEdgeIndex] = <Edge x1={x1} y1={y1} x2={x2} y2={y2} key={selectedEdgeIndex} />;
    setEdges([...edges]);
  }, [selectedEdgeStartCoords, selectedEdgeEndCoords]);
  
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
      {nodes}
      {edges}
    </div>
  )
}

export default Grid;

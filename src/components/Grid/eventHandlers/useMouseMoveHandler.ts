import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useGraph } from '@/hooks/useGraph';

export const useMouseMoveHandler = () => {
  // get redux state
  const { editorMode } = useSelector((state: RootState) => state.mode);
  const { cellSize, isGridDragging, offset, scale } = useSelector((state: RootState) => state.grid);
  const { graph } = useSelector((state: RootState) => state.graph);

  const { addNode, addEdge, removeNode, getNode } = useGraph();

  const {
    isDragging,
    draggingNode,
    isEdgeSelected,
    selectedEdge,
    prevMousePos,
   } = useSelector((state: any) => state.mouse);


  const dispatch = useDispatch();

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
      const svg = document.getElementById('svg-grid');
      const ctm = svg.getScreenCTM();
  
      const mouseX = (event.clientX - ctm.e) / ctm.a;
      const mouseY = (event.clientY - ctm.f) / ctm.d;
  
      const coords = {
        x: Math.floor(mouseX / cellSize),
        y: Math.floor(mouseY / cellSize),
      };
  
      if (editorMode === 'grid' && isGridDragging) {
        const { clientX, clientY } = event;
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;

        dispatch({
          type: 'SET_GRID_OFFSET',
          payload: { x: offset.x - (deltaX/scale)/2, y: offset.y - (deltaY/scale)/2 }
        })

        dispatch({
          type: 'SET_PREV_MOUSE_POS',
          payload: { x: clientX, y: clientY }
        })
      }
  
      if (editorMode === 'edge' && isEdgeSelected) {
        dispatch({
          type: 'SET_SELECTED_EDGE',
          payload: {
            source: selectedEdge.source,
            target: {
              label: '',
              coords: { x: mouseX / cellSize - 0.5, y: mouseY / cellSize - 0.5 }
            } as Node
          }
        });
      }
  
      else if (editorMode === 'edit' && isDragging) {
        const node = draggingNode;
  
        // TODO: fix this: x and y are swapped because of the way the graph is rendered
  
        dispatch({
          type: 'SET_GRAPH',
          payload: {
            nodes: [
              ...graph.nodes.filter((n: Node) => n.label !== node.label),
              {
                label: node.label,
                coords: { x: mouseX / cellSize - 0.5, y: mouseY / cellSize - 0.5 }
              }
            ],
            edges: [
              ...graph.edges.filter((e: Edge) => e.source.label !== node.label && e.target.label !== node.label),
              ...graph.edges.filter((e: Edge) => e.source.label === node.label).map((e: Edge) => {
                return {
                  source: { label: node.label, coords: { x: mouseX / cellSize - 0.5, y: mouseY / cellSize - 0.5 } },
                  target: e.target,
                  weight: e.weight
                }
              }),
              ...graph.edges.filter((e: Edge) => e.target.label === node.label).map((e: Edge) => {
                return {
                  source: e.source,
                  target: { label: node.label, coords: { x: mouseX / cellSize - 0.5, y: mouseY / cellSize - 0.5 } },
                  weight: e.weight
                }
              })
            ]
          }
        });
      }
  }, [editorMode, isGridDragging, isEdgeSelected, selectedEdge, isDragging, draggingNode, cellSize, dispatch, graph, prevMousePos, offset, scale]);
  return handleMouseMove;
}

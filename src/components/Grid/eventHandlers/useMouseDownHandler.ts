import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useGraph } from '@/hooks/useGraph';

export const useMouseDownHandler = () => {
  // get redux state
  const { editorMode } = useSelector((state: RootState) => state.mode);
  const { cellSize, isGridDragging } = useSelector((state: RootState) => state.grid);
  const { isEdgeSelected, selectedEdge, isDragging } = useSelector((state: RootState) => state.mouse);

  const { addNode, addEdge, removeNode, getNode } = useGraph();
  const { graph } = useSelector((state: RootState) => state.graph);


  const dispatch = useDispatch();

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
      const svg = document.getElementById('svg-grid');
      const ctm = svg.getScreenCTM();    
  
      const mouseX = (event.clientX - ctm.e) / ctm.a;
      const mouseY = (event.clientY - ctm.f) / ctm.d;
  
      const coords = {
        x: Math.floor(mouseX / cellSize),
        y: Math.floor(mouseY / cellSize),
      };
  
      if (editorMode === 'grid') {
        dispatch({
          type: 'SET_IS_GRID_DRAGGING',
          payload: true
        });

        dispatch({
          type: 'SET_PREV_MOUSE_POS',
          payload: { x: event.clientX, y: event.clientY }
        })

      } else if (editorMode === 'node') {
        addNode(coords);
      } else if (editorMode === 'edge') {
        if (isEdgeSelected) {
          const node = getNode(coords);
          if (!node)
            return;
  
          if (selectedEdge.source.coords.x != selectedEdge.target.coords.x || selectedEdge.source.coords.y != selectedEdge.target.coords.y) {
            dispatch({
              type: 'SET_SELECTED_EDGE',
              payload: {
                source: selectedEdge.source,
                target: node
              }
            });
  
            addEdge(selectedEdge.source, node, 1); // TODO: get weight from user
  
            dispatch({
              type: 'SET_IS_EDGE_SELECTED',
              payload: false
            });
          }
        } else {
          const node = getNode(coords);
          if (node) {
            const tmpNode = { label: '', coords: node.coords } as Node;
  
            dispatch({
              type: 'SET_SELECTED_EDGE',
              payload: {
                source: node,
                target: tmpNode
              }
            });
  
            dispatch({
              type: 'SET_IS_EDGE_SELECTED',
              payload: true
            });
          }
        }
      } else if (editorMode === 'delete') {
        // TODO: check if node or edge
        removeNode(coords);
      }
  
      else if (editorMode === 'edit') {
        if (isDragging)
          return;
  
        const node = getNode(coords);
        if (!node)
          return;
        
        dispatch({
          type: 'SET_IS_DRAGGING',
          payload: true
        });
  
        dispatch({
          type: 'SET_DRAGGING_NODE',
          payload: node
        });
      }
  }, [editorMode, isEdgeSelected, selectedEdge, isDragging, cellSize, graph, addNode, addEdge, removeNode, getNode, dispatch]);
  return handleMouseDown;
}

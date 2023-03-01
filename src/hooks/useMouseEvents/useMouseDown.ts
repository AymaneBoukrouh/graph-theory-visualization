import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGraph } from '@/hooks/useGraph';
import { Coords, Edge, Node } from '@/types';

export const useMouseDown = () => {
  const { editorMode } = useSelector((state: any) => state.mode);
  const {
    mouseCoords,
    isDragging,
    draggingNode,
    isEdgeSelected,
    selectedEdge
   } = useSelector((state: any) => state.mouse);

  const dispatch = useDispatch();

  const { addNode, removeNode, getNode, addEdge, removeEdge } = useGraph();

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    if (editorMode === 'node')
      addNode(mouseCoords);

    else if (editorMode === 'edge') {
      if (isEdgeSelected) {
        const node = getNode(mouseCoords);
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
        const node = getNode(mouseCoords);
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
    }

    else if (editorMode === 'delete') {
      // TODO: check if node or edge
      removeNode(mouseCoords);
    }

    else if (editorMode === 'edit') {
      if (isDragging)
        return;

      const node = getNode(mouseCoords);
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
  }, [dispatch, editorMode, mouseCoords, isDragging, draggingNode, isEdgeSelected, selectedEdge]);

  return onMouseDown;
}

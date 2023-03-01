import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGraph } from '@/hooks/useGraph';
import { Coords, Edge, Node } from '@/types';

export const useMouseUp = () => {
  const { editorMode } = useSelector((state: any) => state.mode);
  const { graph } = useSelector((state: any) => state.graph);
  const {
    mouseCoords,
    isDragging,
    draggingNode,
    isEdgeSelected,
    selectedEdge
   } = useSelector((state: any) => state.mouse);

  const { addNode, removeNode, getNode, addEdge, removeEdge } = useGraph();

  const dispatch = useDispatch();

  const onMouseUp = useCallback((event: React.MouseEvent) => {
    if (editorMode === 'edit' && isDragging) {
      // update node position
      dispatch({
        type: 'SET_GRAPH',
        payload: {
          nodes: [
            ...graph.nodes.filter((n: Node) => n.label !== draggingNode.label),
            {
              label: draggingNode.label,
              coords: mouseCoords
            }
          ],
          edges: [
            ...graph.edges.filter((e: Edge) => e.source.label !== draggingNode.label && e.target.label !== draggingNode.label),
            ...graph.edges.filter((e: Edge) => e.source.label === draggingNode.label).map((e: Edge) => {
              return {
                source: { label: draggingNode.label, coords: mouseCoords },
                target: e.target,
                weight: e.weight
              }
            }),
            ...graph.edges.filter((e: Edge) => e.target.label === draggingNode.label).map((e: Edge) => {
              return {
                source: e.source,
                target: { label: draggingNode.label, coords: mouseCoords },
                weight: e.weight
              }
            })
          ]
        }
      });

      // reset dragging state
      dispatch({
        type: 'SET_IS_DRAGGING',
        payload: false
      });

      dispatch({
        type: 'SET_DRAGGING_NODE',
        payload: null
      });
    }
  }, [editorMode, isDragging, draggingNode, mouseCoords, graph, dispatch]);

  return onMouseUp;
}

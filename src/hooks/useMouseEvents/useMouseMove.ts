import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGraph } from '@/hooks/useGraph';

export const useMouseMove = () => {
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

  const onMouseMove = useCallback((event: React.MouseEvent) => {
    if (editorMode == 'edge' && isEdgeSelected) {
      const mouseX = event.clientX - event.currentTarget.getBoundingClientRect().left;
      const mouseY = event.clientY - event.currentTarget.getBoundingClientRect().top;

      dispatch({
        type: 'SET_SELECTED_EDGE',
        payload: {
          source: selectedEdge.source,
          target: {
            label: '',
            coords: { x: mouseY-17.5, y: mouseX-17.5 } // TODO: fix this: x and y are swapped because of the way the graph is rendered
          } as Node
        }
      });
    }

    else if (editorMode === 'edit' && isDragging) {
      const node = draggingNode;

      // TODO: fix this: x and y are swapped because of the way the graph is rendered
      const mouseX = event.clientY - event.currentTarget.getBoundingClientRect().top;
      const mouseY = event.clientX - event.currentTarget.getBoundingClientRect().left;

      dispatch({
        type: 'SET_GRAPH',
        payload: {
          nodes: [
            ...graph.nodes.filter((n: Node) => n.label !== node.label),
            {
              label: node.label,
              coords: { x: mouseX-17.5, y: mouseY-17.5 }
            }
          ],
          edges: [
            ...graph.edges.filter((e: Edge) => e.source.label !== node.label && e.target.label !== node.label),
            ...graph.edges.filter((e: Edge) => e.source.label === node.label).map((e: Edge) => {
              return {
                source: { label: node.label, coords: { x: mouseX-17.5, y: mouseY-17.5 } },
                target: e.target
              }
            }),
            ...graph.edges.filter((e: Edge) => e.target.label === node.label).map((e: Edge) => {
              return {
                source: e.source,
                target: { label: node.label, coords: { x: mouseX-17.5, y: mouseY-17.5 } }
              }
            })
          ]
        }
      });
    }
  }, [editorMode, isDragging, draggingNode, isEdgeSelected, selectedEdge, graph, dispatch]);

  return onMouseMove;
}

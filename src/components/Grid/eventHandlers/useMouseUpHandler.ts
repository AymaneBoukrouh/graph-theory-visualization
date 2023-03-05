import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { useGraph } from '@/hooks/useGraph';

export const useMouseUpHandler = () => {
  // get redux state
  const { editorMode } = useSelector((state: RootState) => state.mode);
  const { cellSize, isGridDragging } = useSelector((state: RootState) => state.grid);
  const { graph } = useSelector((state: RootState) => state.graph);

  const {
    isDragging,
    draggingNode,
    isEdgeSelected,
    selectedEdge
   } = useSelector((state: any) => state.mouse);


  const { addNode, addEdge, removeNode, getNode } = useGraph();

  const dispatch = useDispatch();

  const handleMouseUp = useCallback((event: React.MouseEvent) => {
    const svg = document.getElementById('svg-grid');
    const ctm = svg.getScreenCTM();

    const mouseX = (event.clientX - ctm.e) / ctm.a;
    const mouseY = (event.clientY - ctm.f) / ctm.d;

    const coords = {
      x: Math.floor(mouseX / cellSize),
      y: Math.floor(mouseY / cellSize),
    };

    if (editorMode === 'grid')
      dispatch({
        type: 'SET_IS_GRID_DRAGGING',
        payload: false
      })

    if (editorMode === 'edit' && isDragging) {
      // update node position
      dispatch({
        type: 'SET_GRAPH',
        payload: {
          nodes: [
            ...graph.nodes.filter((n: Node) => n.label !== draggingNode.label),
            {
              label: draggingNode.label,
              coords: coords
            }
          ],
          edges: [
            ...graph.edges.filter((e: Edge) => e.source.label !== draggingNode.label && e.target.label !== draggingNode.label),
            ...graph.edges.filter((e: Edge) => e.source.label === draggingNode.label).map((e: Edge) => {
              return {
                source: { label: draggingNode.label, coords: coords },
                target: e.target,
                weight: e.weight
              }
            }),
            ...graph.edges.filter((e: Edge) => e.target.label === draggingNode.label).map((e: Edge) => {
              return {
                source: e.source,
                target: { label: draggingNode.label, coords: coords },
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
  }, [editorMode, isDragging, draggingNode, graph, cellSize, dispatch]);
  return handleMouseUp;
}

import { useSelector } from "react-redux";
import { Node } from "./Node";

export const Nodes = () => {
  const { graph } = useSelector((state: any) => state.graph);
  
  return (
    <>
    {graph.nodes.map((node: any) =>
            <Node node={node} key={`node-${node.label}`} />
    )}
    </>
  )
}

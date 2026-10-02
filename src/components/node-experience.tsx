import type { SiteNodeDefinition } from "../registry";
import { getPublicGraphLayout } from "../graph/public-graph";
import { NetworkExplorer } from "./network/network-explorer";
import { NodePage } from "./node-page";

interface NodeExperienceProps {
  node: SiteNodeDefinition;
}

export async function NodeExperience({ node }: NodeExperienceProps) {
  const graph = await getPublicGraphLayout();

  return (
    <div className="node-experience">
      <section className="network-stage" aria-label="Explore Superior MI">
        <NetworkExplorer graph={graph} activeNodeId={node.id} />
      </section>
      <div className="content-stage">
        <NodePage node={node} />
      </div>
    </div>
  );
}

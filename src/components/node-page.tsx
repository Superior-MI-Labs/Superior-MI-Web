import type { SiteNodeDefinition } from "@/registry";
import { NodePageShell } from "./node-page-shell";
import { getNodePageRenderer } from "./page-renderers";

interface NodePageProps {
  node: SiteNodeDefinition;
}

export function NodePage({ node }: NodePageProps) {
  const PageRenderer = getNodePageRenderer(node.type);

  return (
    <NodePageShell node={node}>
      <PageRenderer node={node} />
    </NodePageShell>
  );
}

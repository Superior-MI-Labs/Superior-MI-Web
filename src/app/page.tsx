import { NodeExperience } from "@/components/node-experience";
import { siteRegistry } from "@/registry";

export default function HomePage() {
  return (
    <NodeExperience node={siteRegistry.requireNode(siteRegistry.rootId)} />
  );
}

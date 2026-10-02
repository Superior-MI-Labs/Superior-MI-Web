import { NodePage } from "@/components/node-page";
import { siteRegistry } from "@/registry";

export default function HomePage() {
  return <NodePage node={siteRegistry.requireNode(siteRegistry.rootId)} />;
}

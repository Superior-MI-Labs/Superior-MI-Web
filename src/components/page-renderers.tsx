import Link from "next/link";
import type { ComponentType } from "react";
import type { SiteNodeDefinition, SiteNodeType } from "@/registry";
import { siteRegistry } from "@/registry";

export interface NodePageRendererProps {
  node: SiteNodeDefinition;
}

function ChildCards({ node }: NodePageRendererProps) {
  const children = siteRegistry.getChildren(node.id).filter((child) => child.visibility === "public");

  if (children.length === 0) {
    return null;
  }

  return (
    <section className="node-page__section" aria-labelledby="explore-title">
      <h2 id="explore-title">Explore</h2>
      <div className="card-grid">
        {children.map((child) => (
          <Link className="node-card" href={siteRegistry.getRoute(child.id)} key={child.id}>
            <span className={"status status--" + child.status}>{child.status}</span>
            <h3>{child.title}</h3>
            <p>{child.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function LandingPageRenderer(props: NodePageRendererProps) {
  return <ChildCards {...props} />;
}

function StandardPageRenderer(props: NodePageRendererProps) {
  return <ChildCards {...props} />;
}

const PAGE_RENDERERS = {
  landing: LandingPageRenderer,
  organization: StandardPageRenderer,
  product: StandardPageRenderer,
  research: StandardPageRenderer,
  community: StandardPageRenderer,
  developer: StandardPageRenderer,
  utility: StandardPageRenderer,
} satisfies Record<SiteNodeType, ComponentType<NodePageRendererProps>>;

export function getNodePageRenderer(type: SiteNodeType): ComponentType<NodePageRendererProps> {
  return PAGE_RENDERERS[type];
}

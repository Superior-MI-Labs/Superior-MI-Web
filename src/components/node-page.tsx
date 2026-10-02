import Link from "next/link";
import type { SiteNodeDefinition } from "@/registry";
import { siteRegistry } from "@/registry";

interface NodePageProps {
  node: SiteNodeDefinition;
}

export function NodePage({ node }: NodePageProps) {
  const children = siteRegistry
    .getChildren(node.id)
    .filter((child) => child.visibility === "public");

  const related = (node.relationships ?? [])
    .map((relationship) => ({
      relationship,
      node: siteRegistry.getNode(relationship.target),
    }))
    .filter(
      (
        item,
      ): item is {
        relationship: NonNullable<typeof node.relationships>[number];
        node: SiteNodeDefinition;
      } => Boolean(item.node && item.node.visibility === "public"),
    );

  return (
    <main className="node-page">
      <section className="node-page__hero">
        <span className={`status status--${node.status}`}>{node.status}</span>
        <p className="eyebrow">{node.type}</p>
        <h1>{node.title}</h1>
        <p className="node-page__summary">{node.summary}</p>
      </section>

      {children.length > 0 ? (
        <section className="node-page__section" aria-labelledby="explore-title">
          <h2 id="explore-title">Explore</h2>
          <div className="card-grid">
            {children.map((child) => (
              <Link
                className="node-card"
                href={siteRegistry.getRoute(child.id)}
                key={child.id}
              >
                <span className={`status status--${child.status}`}>
                  {child.status}
                </span>
                <h3>{child.title}</h3>
                <p>{child.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="node-page__section" aria-labelledby="related-title">
          <h2 id="related-title">Connected areas</h2>
          <div className="relationship-list">
            {related.map(({ relationship, node: relatedNode }) => (
              <Link
                href={siteRegistry.getRoute(relatedNode.id)}
                key={`${node.id}:${relationship.type}:${relatedNode.id}`}
              >
                <span>{relationship.type}</span>
                <strong>{relatedNode.shortTitle}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {node.status !== "active" ? (
        <section className="placeholder-note">
          <strong>This area is {node.status}.</strong>
          <p>
            It is present so the site can communicate the larger Superior MI
            direction without presenting unfinished work as a finished service.
          </p>
        </section>
      ) : null}
    </main>
  );
}

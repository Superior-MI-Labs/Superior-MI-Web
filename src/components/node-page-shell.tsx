import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteNodeDefinition } from "@/registry";
import { siteRegistry } from "@/registry";

interface NodePageShellProps {
  node: SiteNodeDefinition;
  children?: ReactNode;
}

export function NodePageShell({ node, children }: NodePageShellProps) {
  const breadcrumbs = siteRegistry.getBreadcrumbs(node.id);
  const related = (node.relationships ?? [])
    .map((relationship) => ({ relationship, node: siteRegistry.getNode(relationship.target) }))
    .filter((item): item is { relationship: NonNullable<typeof node.relationships>[number]; node: SiteNodeDefinition } =>
      Boolean(item.node && item.node.visibility === "public"),
    );

  return (
    <main className="node-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span className="breadcrumbs__item" key={crumb.id}>
            {index > 0 ? <span className="breadcrumbs__separator" aria-hidden="true">/</span> : null}
            {crumb.id === node.id ? <span aria-current="page">{crumb.title}</span> : <Link href={crumb.route}>{crumb.title}</Link>}
          </span>
        ))}
      </nav>

      <section className="node-page__hero">
        <span className={"status status--" + node.status}>{node.status}</span>
        <p className="eyebrow">{node.type}</p>
        <h1>{node.title}</h1>
        <p className="node-page__summary">{node.summary}</p>
      </section>

      {children}

      {related.length > 0 ? (
        <section className="node-page__section" aria-labelledby="related-title">
          <h2 id="related-title">Connected areas</h2>
          <div className="relationship-list">
            {related.map(({ relationship, node: relatedNode }) => (
              <Link href={siteRegistry.getRoute(relatedNode.id)} key={node.id + ":" + relationship.type + ":" + relatedNode.id}>
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
          <p>It is present so the site can communicate the larger Superior MI direction without presenting unfinished work as a finished service.</p>
        </section>
      ) : null}
    </main>
  );
}

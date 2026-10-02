import type { SiteNodeVisibility, SiteRegistry } from "../registry";
import type {
  GraphEdgeProjection,
  GraphNodeProjection,
  SiteGraphProjection,
} from "./types";

export interface GraphProjectionOptions {
  readonly allowedVisibilities?: readonly SiteNodeVisibility[];
}

function visibilitySet(
  allowed: readonly SiteNodeVisibility[] | undefined,
): ReadonlySet<SiteNodeVisibility> {
  return new Set(allowed ?? ["public"]);
}

export function projectRegistryToGraph(
  registry: SiteRegistry,
  options: GraphProjectionOptions = {},
): SiteGraphProjection {
  const allowed = visibilitySet(options.allowedVisibilities);
  const visibleNodes = registry.nodes.filter((node) =>
    allowed.has(node.visibility),
  );
  const visibleIds = new Set(visibleNodes.map((node) => node.id));

  const nodes: GraphNodeProjection[] = visibleNodes.map((node) => ({
    id: node.id,
    parentId:
      node.parent !== null && visibleIds.has(node.parent) ? node.parent : null,
    label: node.shortTitle,
    title: node.title,
    summary: node.summary,
    route: registry.getRoute(node.id),
    type: node.type,
    status: node.status,
    visibility: node.visibility,
    layout: node.layout,
  }));

  const edges: GraphEdgeProjection[] = [];

  for (const node of visibleNodes) {
    if (node.parent !== null && visibleIds.has(node.parent)) {
      edges.push({
        id: `hierarchy:${node.parent}->${node.id}`,
        source: node.parent,
        target: node.id,
        kind: "hierarchy",
      });
    }

    for (const relationship of node.relationships ?? []) {
      if (!visibleIds.has(relationship.target)) {
        continue;
      }

      edges.push({
        id: `relationship:${node.id}:${relationship.type}->${relationship.target}`,
        source: node.id,
        target: relationship.target,
        kind: "relationship",
        relationshipType: relationship.type,
      });
    }
  }

  nodes.sort((a, b) => a.id.localeCompare(b.id));
  edges.sort((a, b) => a.id.localeCompare(b.id));

  return Object.freeze({
    nodes: Object.freeze(nodes),
    edges: Object.freeze(edges),
  });
}

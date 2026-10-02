import type { SiteGraphProjection } from "./types";

export function getFocusNodeIds(
  graph: SiteGraphProjection,
  activeNodeId: string,
): readonly string[] {
  const active = graph.nodes.find((node) => node.id === activeNodeId);
  if (!active) {
    return Object.freeze([]);
  }

  const focused = new Set<string>([active.id]);

  if (active.parentId) {
    focused.add(active.parentId);
  }

  for (const node of graph.nodes) {
    if (node.parentId === active.id) {
      focused.add(node.id);
    }
  }

  for (const edge of graph.edges) {
    if (edge.kind !== "relationship") {
      continue;
    }

    if (edge.source === active.id) {
      focused.add(edge.target);
    }

    if (edge.target === active.id) {
      focused.add(edge.source);
    }
  }

  return Object.freeze([...focused].sort());
}

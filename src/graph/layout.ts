import ELK from "elkjs/lib/elk.bundled.js";
import type { ElkNode } from "elkjs/lib/elk-api";
import type {
  GraphNodeProjection,
  SiteGraphProjection,
} from "./types";

const elk = new ELK();

const LAYOUT_OPTIONS = Object.freeze({
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.spacing.nodeNode": "72",
  "elk.layered.spacing.nodeNodeBetweenLayers": "112",
  "elk.layered.spacing.edgeNodeBetweenLayers": "48",
  "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.padding": "[top=56,left=56,bottom=56,right=56]",
});

function dimensions(node: GraphNodeProjection) {
  switch (node.layout?.importance) {
    case "primary":
      return { width: 240, height: 96 };
    case "secondary":
      return { width: 176, height: 72 };
    default:
      return { width: 204, height: 82 };
  }
}

export interface PositionedGraphNode extends GraphNodeProjection {
  readonly position: {
    readonly x: number;
    readonly y: number;
  };
  readonly width: number;
  readonly height: number;
}

export interface PositionedSiteGraph {
  readonly nodes: readonly PositionedGraphNode[];
  readonly edges: SiteGraphProjection["edges"];
  readonly width: number;
  readonly height: number;
}

export async function layoutSiteGraph(
  graph: SiteGraphProjection,
): Promise<PositionedSiteGraph> {
  const elkGraph: ElkNode = {
    id: "superior-mi",
    layoutOptions: LAYOUT_OPTIONS,
    children: graph.nodes.map((node) => ({
      id: node.id,
      ...dimensions(node),
    })),
    edges: graph.edges
      .filter((edge) => edge.kind === "hierarchy")
      .map((edge) => ({
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target],
      })),
  };

  const layouted = await elk.layout(elkGraph);
  const positions = new Map(
    (layouted.children ?? []).map((node) => [
      node.id,
      {
        x: node.x ?? 0,
        y: node.y ?? 0,
        width: node.width ?? 0,
        height: node.height ?? 0,
      },
    ]),
  );

  const nodes = graph.nodes.map<PositionedGraphNode>((node) => {
    const position = positions.get(node.id);
    if (!position) {
      throw new Error("ELK did not return a position for " + node.id + ".");
    }

    return Object.freeze({
      ...node,
      position: Object.freeze({ x: position.x, y: position.y }),
      width: position.width,
      height: position.height,
    });
  });

  return Object.freeze({
    nodes: Object.freeze(nodes),
    edges: graph.edges,
    width: layouted.width ?? 0,
    height: layouted.height ?? 0,
  });
}

import type {
  SiteLayoutHint,
  SiteNodeStatus,
  SiteNodeType,
  SiteNodeVisibility,
  SiteRelationshipType,
} from "../registry";

export interface GraphNodeProjection {
  readonly id: string;
  readonly parentId: string | null;
  readonly label: string;
  readonly title: string;
  readonly summary: string;
  readonly route: string;
  readonly type: SiteNodeType;
  readonly status: SiteNodeStatus;
  readonly visibility: SiteNodeVisibility;
  readonly layout?: SiteLayoutHint;
}

export interface GraphEdgeProjection {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly kind: "hierarchy" | "relationship";
  readonly relationshipType?: SiteRelationshipType;
}

export interface SiteGraphProjection {
  readonly nodes: readonly GraphNodeProjection[];
  readonly edges: readonly GraphEdgeProjection[];
}

export const SITE_NODE_TYPES = [
  "landing",
  "organization",
  "product",
  "research",
  "community",
  "developer",
  "utility",
] as const;

export type SiteNodeType = (typeof SITE_NODE_TYPES)[number];

export const SITE_NODE_STATUSES = [
  "active",
  "building",
  "research",
  "planned",
  "future",
] as const;

export type SiteNodeStatus = (typeof SITE_NODE_STATUSES)[number];

export const SITE_NODE_VISIBILITIES = [
  "public",
  "authenticated",
  "internal",
  "private",
] as const;

export type SiteNodeVisibility = (typeof SITE_NODE_VISIBILITIES)[number];

export const SITE_RELATIONSHIP_TYPES = [
  "related",
  "researches",
  "uses",
  "provides",
  "powers",
  "participates",
  "launches",
] as const;

export type SiteRelationshipType = (typeof SITE_RELATIONSHIP_TYPES)[number];

export interface SiteRelationship {
  readonly target: string;
  readonly type: SiteRelationshipType;
}

export interface SiteLayoutHint {
  readonly importance?: "primary" | "normal" | "secondary";
  readonly cluster?: string;
}

export interface SiteNodeDefinition {
  readonly id: string;
  readonly parent: string | null;
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly summary: string;
  readonly type: SiteNodeType;
  readonly status: SiteNodeStatus;
  readonly visibility: SiteNodeVisibility;
  readonly relationships?: readonly SiteRelationship[];
  readonly layout?: SiteLayoutHint;
}

export interface SiteBreadcrumb {
  readonly id: string;
  readonly title: string;
  readonly route: string;
}

export interface SiteRegistry {
  readonly rootId: string;
  readonly nodes: readonly SiteNodeDefinition[];
  getNode(id: string): SiteNodeDefinition | undefined;
  requireNode(id: string): SiteNodeDefinition;
  getChildren(id: string): readonly SiteNodeDefinition[];
  getAncestors(id: string): readonly SiteNodeDefinition[];
  getBreadcrumbs(id: string): readonly SiteBreadcrumb[];
  getRoute(id: string): string;
  resolveRoute(pathname: string): SiteNodeDefinition | undefined;
}

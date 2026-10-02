import type {
  SiteBreadcrumb,
  SiteNodeDefinition,
  SiteRegistry,
} from "./types";

function normalizePathname(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;
  if (withLeadingSlash === "/") {
    return "/";
  }
  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

function expectedNodeId(node: SiteNodeDefinition, rootId: string): string {
  if (node.parent === null) {
    return rootId;
  }
  if (node.parent === rootId) {
    return node.slug;
  }
  return `${node.parent}.${node.slug}`;
}

export function createSiteRegistry(
  definitions: readonly SiteNodeDefinition[],
): SiteRegistry {
  if (definitions.length === 0) {
    throw new Error("SiteRegistry must contain at least one node.");
  }

  const byId = new Map<string, SiteNodeDefinition>();
  for (const node of definitions) {
    if (!node.id.trim()) {
      throw new Error("Site node id must not be empty.");
    }
    if (byId.has(node.id)) {
      throw new Error(`Duplicate site node id: ${node.id}`);
    }
    byId.set(node.id, node);
  }

  const roots = definitions.filter((node) => node.parent === null);
  if (roots.length !== 1) {
    throw new Error(
      `SiteRegistry requires exactly one root node; found ${roots.length}.`,
    );
  }

  const root = roots[0];
  const rootId = root.id;

  if (root.slug !== "") {
    throw new Error("Root site node slug must be empty.");
  }

  const children = new Map<string, SiteNodeDefinition[]>();
  for (const node of definitions) {
    if (node.parent === null) {
      continue;
    }

    if (!node.slug.trim()) {
      throw new Error(`Non-root site node ${node.id} requires a slug.`);
    }

    if (!byId.has(node.parent)) {
      throw new Error(
        `Site node ${node.id} references missing parent ${node.parent}.`,
      );
    }

    const expectedId = expectedNodeId(node, rootId);
    if (node.id !== expectedId) {
      throw new Error(
        `Site node ${node.id} must mirror hierarchy as ${expectedId}.`,
      );
    }

    const siblings = children.get(node.parent) ?? [];
    if (siblings.some((sibling) => sibling.slug === node.slug)) {
      throw new Error(
        `Duplicate sibling slug "${node.slug}" below ${node.parent}.`,
      );
    }
    siblings.push(node);
    children.set(node.parent, siblings);
  }

  for (const node of definitions) {
    const seen = new Set<string>();
    let current: SiteNodeDefinition | undefined = node;

    while (current?.parent !== null) {
      if (seen.has(current.id)) {
        throw new Error(`Hierarchy cycle detected at ${current.id}.`);
      }
      seen.add(current.id);
      current = byId.get(current.parent);
      if (!current) {
        break;
      }
    }
  }

  for (const node of definitions) {
    for (const relationship of node.relationships ?? []) {
      if (!byId.has(relationship.target)) {
        throw new Error(
          `Site node ${node.id} references missing relationship target ${relationship.target}.`,
        );
      }
      if (relationship.target === node.id) {
        throw new Error(`Site node ${node.id} cannot relate to itself.`);
      }
    }
  }

  const routeById = new Map<string, string>();
  const nodeByRoute = new Map<string, SiteNodeDefinition>();

  function buildRoute(id: string): string {
    const existing = routeById.get(id);
    if (existing) {
      return existing;
    }

    const node = byId.get(id);
    if (!node) {
      throw new Error(`Unknown site node: ${id}`);
    }

    if (node.parent === null) {
      routeById.set(id, "/");
      return "/";
    }

    const parentRoute = buildRoute(node.parent);
    const route =
      parentRoute === "/" ? `/${node.slug}` : `${parentRoute}/${node.slug}`;

    if (nodeByRoute.has(route)) {
      throw new Error(`Duplicate derived route: ${route}`);
    }

    routeById.set(id, route);
    nodeByRoute.set(route, node);
    return route;
  }

  for (const node of definitions) {
    const route = buildRoute(node.id);
    if (node.parent === null) {
      nodeByRoute.set("/", node);
    }
    if (!node.title.trim() || !node.shortTitle.trim() || !node.summary.trim()) {
      throw new Error(`Site node ${node.id} requires display copy.`);
    }
    if (!route.startsWith("/")) {
      throw new Error(`Derived route for ${node.id} is invalid.`);
    }
  }

  const frozenNodes = Object.freeze([...definitions]);

  return Object.freeze({
    rootId,
    nodes: frozenNodes,

    getNode(id: string) {
      return byId.get(id);
    },

    requireNode(id: string) {
      const node = byId.get(id);
      if (!node) {
        throw new Error(`Unknown site node: ${id}`);
      }
      return node;
    },

    getChildren(id: string) {
      return Object.freeze([...(children.get(id) ?? [])]);
    },

    getAncestors(id: string) {
      const node = byId.get(id);
      if (!node) {
        throw new Error(`Unknown site node: ${id}`);
      }

      const ancestors: SiteNodeDefinition[] = [];
      let current = node;

      while (current.parent !== null) {
        const parent = byId.get(current.parent);
        if (!parent) {
          throw new Error(
            `Site node ${current.id} references missing parent ${current.parent}.`,
          );
        }
        ancestors.unshift(parent);
        current = parent;
      }

      return Object.freeze(ancestors);
    },

    getBreadcrumbs(id: string) {
      const lineage = [...this.getAncestors(id), this.requireNode(id)];
      return Object.freeze(
        lineage.map<SiteBreadcrumb>((node) =>
          Object.freeze({
            id: node.id,
            title: node.shortTitle,
            route: this.getRoute(node.id),
          }),
        ),
      );
    },

    getRoute(id: string) {
      const route = routeById.get(id);
      if (!route) {
        throw new Error(`Unknown site node: ${id}`);
      }
      return route;
    },

    resolveRoute(pathname: string) {
      return nodeByRoute.get(normalizePathname(pathname));
    },
  });
}

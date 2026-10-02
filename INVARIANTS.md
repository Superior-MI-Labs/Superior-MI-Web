# Superior MI Web Invariants

## One structure authority

There is one canonical SiteRegistry.

No second sitemap may be maintained in:

- navigation configuration;
- route configuration;
- graph configuration;
- mobile configuration;
- search configuration;
- breadcrumb configuration.

## Derived views stay derived

Graph nodes, menus, search entries, breadcrumbs, route indexes, and icon paths are projections.

They may be cached for performance.

They may not silently become editable truth sources.

## One activation path

Normal site navigation uses one node activation contract.

Do not add page-specific open functions for ordinary nodes.

## Real URLs

Every meaningful page state has a route that supports:

- direct entry;
- refresh;
- back;
- forward;
- sharing.

## One canonical parent

An ordinary node has at most one canonical parent.

Cross-cutting connections use typed relationships instead of duplicate sitemap placement.

## No hidden private graph

Unauthorized clients must not receive private or internal nodes and then hide them with CSS.

Visibility projection happens before delivery.

## Deterministic graph

Equivalent registry input and layout policy must produce equivalent layout identity.

Random force layout is not the navigation model.

## Thin UI

The browser does not become a second AIR runtime, project state owner, identity authority, or research database.

## Graceful incompleteness

R0 must support:

- coming-soon nodes;
- missing custom icons;
- placeholder content;
- future branches that are not yet operational.

Incomplete content must not require fake maturity claims.

## Accessible alternate navigation

The graph is not the only way to navigate.

Semantic navigation and page links remain usable when graph interaction is unavailable or unsuitable.

## Extension test

Adding a normal node must not require application-plumbing edits.

Expected authoring surface:

- registry entry;
- optional content;
- optional SVG icon.

## Dependency restraint

Do not add a dependency for a capability already provided cleanly by the selected stack.

R0 should remain small enough for a future maintainer to understand without reconstructing a framework zoo.

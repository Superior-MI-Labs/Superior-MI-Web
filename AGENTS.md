# Superior MI Web Agent Contract

Superior MI Web is the public and authenticated web surface for the broader Superior MI ecosystem.

This repository owns web presentation, navigation, routing, graph projection, page composition, and web-specific interaction behavior. It does not own the implementation truth of AIR, Builder, MEF, Inference Fabric, GSS, Kisha, or future sibling systems.

## Source hierarchy

When project facts matter:

1. Read the owning Superior MI repository.
2. Use Superior-MI-Labs/Agent-Continuity for cross-project orientation.
3. Treat this repository as authority only for the Superior MI web product.

Do not copy implementation state from another project into this repository as a competing source of truth.

## Architecture rules

- One canonical site registry owns web hierarchy and node metadata.
- Routes, breadcrumbs, navigation, search, graph nodes, graph hierarchy edges, and icon resolution derive from that registry.
- The graph renderer is a projection, not an authority.
- URLs remain real web routes and must support refresh, direct links, browser history, and sharing.
- Hierarchy and cross-cutting relationships are separate concepts.
- One node activation pipeline handles graph clicks, navigation clicks, breadcrumbs, search, and direct-route focus.
- Page types are reusable renderers. Do not hand-build one component per site node without evidence that a specialized renderer is needed.
- Private or internal nodes must be filtered before data reaches an unauthorized client.
- Missing artwork or unfinished content must degrade gracefully.
- Layout should be deterministic for the same registry and policy.
- UI remains thin over authoritative data and services.
- New complexity must earn its place through a capability or failing test.

## Change discipline

Before adding a new subsystem, check whether the capability belongs in:

- the site registry;
- the graph projector;
- the route resolver;
- the page renderer registry;
- the visual design system;
- an existing Superior MI project.

Prefer extending those authorities over adding parallel configuration or logic.

## R0 local-showcase test

A new ordinary site node should require only:

1. one registry entry;
2. optional content;
3. optional SVG artwork.

It must not require edits to routing, graph construction, navigation, breadcrumbs, search, mobile navigation, or node-opening logic.

If it does, stop and fix the owning architecture.

## Public maturity language

Keep these distinct:

- active;
- building;
- research;
- planned;
- future.

Do not present planned Superior MI branches or capabilities as established operating systems.

## Current development authority

Read docs/development/CURRENT.md before implementation work.

# Superior MI Web Architecture R0

## Purpose

Superior MI Web is the shared web product for:

- the public Superior MI site;
- the interactive Superior MI network explorer;
- future web applications;
- the future authenticated Superior MI Hub;
- future AIR web access and developer surfaces.

R0 does not attempt to implement all of those products. R0 establishes the architecture that lets them grow without creating duplicate navigation, routing, graph, or page systems.

## R0 endpoint

A fresh local clone must be able to launch an interactive Superior MI site where a user can:

- explore the ecosystem as a node graph;
- navigate through conventional top-level navigation;
- focus a node and open its page;
- use direct URLs;
- use browser back and forward;
- see related nodes and hierarchy;
- reach placeholder pages safely;
- add an ordinary site node without editing application plumbing.

## Authority model

~~~text
SiteRegistry
    |
    +--> RouteResolver
    +--> NavigationProjection
    +--> BreadcrumbProjection
    +--> SearchProjection
    +--> GraphProjector
    |       |
    |       +--> LayoutEngine
    |       +--> GraphRenderer
    |
    +--> PageResolver
            |
            +--> PageRendererRegistry
            +--> Content
~~~

SiteRegistry is the only authority for site structure.

Derived systems may cache or transform registry data, but may not become competing authorities.

## Runtime boundaries

### Server-owned

The server resolves:

- canonical registry;
- visibility projection;
- route identity;
- metadata required for server rendering;
- future authenticated entitlements.

Private or internal records must be removed before an unauthorized client receives graph data.

### Client-owned

The client owns transient interaction state such as:

- viewport;
- hover;
- current visual focus;
- animation state;
- open or collapsed panel state.

Client state does not redefine site hierarchy.

## Graph model

The graph has two edge classes.

### Hierarchy

The canonical sitemap is a tree. Each ordinary node has at most one canonical parent.

Example:

~~~text
Ecosystem
  Technologies
    AIR
~~~

Hierarchy answers: where does this live?

### Relationships

A node may have any number of typed relationships.

Example:

~~~text
AIR <-> Labs
AIR <-> Compute
AIR <-> Developers
AIR <-> Hub
~~~

Relationships answer: what is this connected to?

A relationship never creates a second canonical parent.

## Node activation

All navigation converges on one behavior:

~~~text
activateNode(nodeId)
    |
    +--> resolve node
    +--> resolve canonical route
    +--> update router
    +--> focus graph
    +--> project local neighborhood
    +--> animate viewport
    +--> render page
~~~

The following must not implement independent page-opening logic:

- graph nodes;
- top navigation;
- breadcrumbs;
- search;
- related-node links.

## Routing

The web router remains authoritative for browser location.

Every meaningful page has a stable route.

A direct visit to a route must initialize the same selected node state that an in-app navigation would produce.

Graph state must not trap navigation inside a client-only JavaScript state machine.

## Rendering

Pages are rendered through a small renderer registry.

Initial page types:

- landing;
- organization;
- product;
- research;
- community;
- developer;
- utility.

Ordinary pages should be data and content using a shared renderer.

A specialized component is justified only when the interaction cannot be represented by an existing page type.

## Layout

R0 targets React Flow as the graph interaction surface and ELK as the automatic layout engine.

The same registry plus the same layout policy should produce stable placement.

Prefer semantic layout hints such as importance or cluster over manually maintained x/y coordinates.

Manual coordinates are an escape hatch, not the normal authoring model.

## Icons

Canonical icon identity is derived from node id.

Example:

~~~text
ecosystem.foundation
    ->
/nodes/ecosystem/foundation.svg
~~~

Missing custom artwork falls back to the node-type icon.

The site must not require bespoke artwork to remain navigable.

## Future authentication

Visibility is part of the node contract so R0 does not need a second information architecture later.

Expected visibility classes:

- public;
- authenticated;
- internal;
- private.

Authorization projection happens before graph delivery.

## Relationship to other Superior MI systems

Superior MI Web presents and integrates systems. It does not absorb their authorities.

Examples:

- AIR owns AIR execution and AIR runtime facts.
- Builder owns structural system composition.
- MEF owns qualified provider binding and deployment planning within its scope.
- Inference Fabric owns its reuse and continuity behavior.
- Kisha owns Kisha identity and private operational state.
- Agent Continuity owns cross-project onboarding and orientation.

Web integrations should consume stable contracts from those systems rather than reimplement them.

## R0 non-goals

R0 intentionally does not require:

- account authentication;
- database-backed content management;
- billing;
- API-key management;
- cloud AIR inference;
- live organization telemetry;
- admin UI;
- desktop Hub;
- 3D rendering;
- WebSocket infrastructure.

Those capabilities may be added after the navigation and registry architecture is qualified.

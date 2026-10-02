# ADR 0002: Server-Computed Graph Layout, Thin Client Renderer

Status: accepted for Wave 3.

## Context

Superior MI Web needs a deterministic graph that mirrors the canonical sitemap and can later support authenticated projections.

React Flow provides the interactive browser surface. ELK provides automatic layout.

Running both projection and layout as client-owned state would make the browser responsible for more of the site model than necessary and would ship the layout engine to every visitor.

## Decision

The server-side web layer will:

1. read the canonical SiteRegistry;
2. project the registry to the authorized graph;
3. compute deterministic node positions with ELK;
4. pass the positioned graph to the client.

The React Flow client will render and interact with that positioned graph.

## Layout constraints

Only canonical hierarchy edges influence ELK placement.

Cross-cutting relationship edges are rendered after layout but do not change the sitemap geometry.

This preserves stable spatial hierarchy while still showing how systems connect across branches.

## Consequences

Positive:

- ELK does not need to ship in the normal client bundle;
- the client remains a thin interaction surface;
- registry visibility can be resolved before graph delivery;
- equivalent authorized registry input produces equivalent layout;
- cross-cutting relationships cannot distort canonical navigation structure.

Tradeoffs:

- layout is asynchronous on the server;
- future client-side graph mutation or live node authoring would need an explicit new layout boundary rather than silently moving authority into React Flow.

## Revisit condition

Revisit only if a qualified product requirement demands live client-side structural graph mutation.

Viewport focus, selection, pan, zoom, and route-driven emphasis do not require moving layout authority to the client.

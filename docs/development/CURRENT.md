# Superior MI Web Current Development State

Captured: 2026-10-01

Program: Superior MI Web R0

Current wave: Wave 3, graph renderer and deterministic layout.

Branch:

~~~text
feature/graph-renderer-r0
~~~

## Closed gates

Wave 0 is merged.

Wave 1 is merged and qualified.

Wave 2 is merged and qualified by GitHub Actions:

- registry and graph tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

## Current objective

Render the derived public graph as an interactive web surface without giving the client ownership of site structure or layout.

## Wave 3 architecture

~~~text
SiteRegistry
    |
    v
public visibility projection
    |
    v
SiteGraphProjection
    |
    v
ELK server layout
    |
    v
PositionedSiteGraph
    |
    v
React Flow client renderer
~~~

Only hierarchy edges constrain ELK layout.

Relationship edges render as secondary connections without changing canonical sitemap geometry.

## Implemented in Wave 3 branch

- React Flow 12.11.6;
- ELK 0.12.0;
- server-computed deterministic layered layout;
- primary/normal/secondary node dimensions;
- hierarchy-only layout constraints;
- relationship-edge preservation;
- custom Superior MI graph nodes;
- current-node visual state;
- pan;
- zoom;
- fit view;
- graph controls;
- responsive desktop split experience;
- responsive mobile stacked experience;
- one shared NodeExperience for home and registry routes;
- reduced-motion preservation from the existing visual system.

## Wave 3 exit checklist

- [x] React Flow dependency introduced only after Wave 2
- [x] ELK dependency introduced only after Wave 2
- [x] deterministic server layout implemented
- [x] hierarchy-only layout constraints implemented
- [x] graph renderer implemented
- [x] custom node component implemented
- [x] active node visual state implemented
- [x] pan and zoom implemented
- [x] responsive network stage implemented
- [x] home and registry routes share one experience component
- [x] GitHub CI passes
- [ ] Wave 3 merged to main

## CI result

GitHub Actions Web CI run 9: PASS.

- registry, graph projection, and ELK layout tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

## Next gate

Wave 4, unified node activation and route-driven focus.

Graph clicks, top navigation, breadcrumbs, search, related-node links, and direct routes must converge on one activation contract.

## R0 endpoint

A fresh local clone launches an interactive graph-based Superior MI site and passes the extension test.

Deployment to a public domain is outside the R0 local-showcase gate.

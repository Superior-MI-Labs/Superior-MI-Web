# Superior MI Web Current Development State

Captured: 2026-10-01

Program: Superior MI Web R0

Current wave: Wave 2, graph projection.

Branch:

~~~text
feature/graph-projection-r0
~~~

## Closed gates

Wave 0 is merged.

Wave 1 is merged and qualified by GitHub Actions:

- registry tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

## Current objective

Prove that the SiteRegistry can be projected into deterministic, visibility-safe graph data without making the graph renderer an authority.

## Implemented in Wave 2 branch

- renderer-independent graph node projection;
- hierarchy edge projection;
- typed relationship edge projection;
- public visibility projection by default;
- optional explicit authenticated projection for future server-side use;
- hidden relationship targets removed from public projections;
- deterministic node and edge ordering;
- ordinary Energy-node extension graph test.

## Architecture boundary

~~~text
SiteRegistry
    |
    v
projectRegistryToGraph()
    |
    v
SiteGraphProjection
    |
    +--> future layout
    +--> future React Flow renderer
~~~

React Flow is not imported by the graph projection layer.

## Wave 2 exit checklist

- [x] graph projection types implemented
- [x] hierarchy edges derived from canonical parents
- [x] relationship edges derived from typed registry relations
- [x] public visibility projection implemented
- [x] hidden relationship targets excluded
- [x] deterministic ordering implemented
- [x] extension node projects automatically
- [x] GitHub CI passes
- [ ] Wave 2 merged to main

## CI result

GitHub Actions Web CI run 5: PASS.

- registry and graph tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

## Next gate

Wave 3, graph renderer and deterministic layout.

Only after Wave 2 passes may React Flow and ELK become dependencies.

## R0 endpoint

A fresh local clone launches an interactive graph-based Superior MI site and passes the extension test.

Deployment to a public domain is outside the R0 local-showcase gate.

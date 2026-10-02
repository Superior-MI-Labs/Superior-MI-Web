# Superior MI Web Current Development State

Captured: 2026-10-01

Program: Superior MI Web R0

Current wave: Wave 4, unified activation and route-driven focus.

Branch:

~~~text
feature/node-activation-r0
~~~

## Closed gates

Wave 0 is merged.

Wave 1 is merged and qualified.

Wave 2 is merged and qualified.

Wave 3 is merged and qualified by GitHub Actions:

- registry, graph projection, and ELK layout tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

## Current objective

Make direct URLs, normal navigation, graph nodes, search, breadcrumbs, page cards, and related-node links converge on one canonical route contract without adding a duplicate client navigation store.

## Wave 4 authority

~~~text
SiteRegistry
    |
    +--> canonical route
             |
             +--> ordinary Link
             +--> imperative router.push
                         |
                         v
                    browser URL
                         |
                         v
                   route resolution
                         |
                         v
                  active node identity
                         |
                         v
                    graph focus
~~~

The URL owns active page identity.

React Flow does not.

## Implemented in Wave 4 branch

- keyboard-accessible graph-node activation;
- one imperative route hook for graph and search surfaces;
- canonical direct-route round-trip test for all public graph nodes;
- route-driven graph focus neighborhood;
- active parent/children/relationship context;
- visual recession of non-context graph elements;
- animated viewport fitting without re-layout;
- reduced-motion-aware viewport focus;
- public-only graph search;
- Ctrl/Cmd+K network search shortcut;
- registry-derived breadcrumbs;
- existing page cards and related links remain canonical registry links;
- deterministic layout remains unchanged while focus moves.

## Wave 4 exit checklist

- [x] URL established as active-node authority
- [x] graph nodes activate canonical routes
- [x] graph nodes are keyboard accessible
- [x] direct route round-trip test implemented
- [x] route-driven focus neighborhood implemented
- [x] graph does not re-layout on focus
- [x] network search derives from authorized graph projection
- [x] search uses the same imperative route activation hook
- [x] breadcrumbs derive from SiteRegistry
- [x] reduced-motion focus behavior implemented
- [ ] GitHub CI passes
- [ ] Wave 4 merged to main

## Next gate

Wave 5, page rendering system and showcase content structure.

Do not create one handcrafted component per page. Add reusable page types and content contracts first.

## R0 endpoint

A fresh local clone launches an interactive graph-based Superior MI site and passes the extension test.

Deployment to a public domain is outside the R0 local-showcase gate.

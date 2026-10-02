# Superior MI Web Current Development State

Captured: 2026-10-01

Program: Superior MI Web R0

Current state: Wave 4 closed and merged.

Qualified main checkpoint:

~~~text
29a68d334109046bd54c45d7a7303d8904c25c3c
~~~

## Closed gates

### Wave 0

Architecture freeze: CLOSED.

Established one SiteRegistry authority, canonical hierarchy, typed relationships, visibility boundaries, real routes, extension test, and wave plan.

### Wave 1

Application skeleton: CLOSED / QUALIFIED.

Proved registry validation, canonical route derivation, reverse route lookup, generic page rendering, public navigation, and production Next.js build.

### Wave 2

Graph projection: CLOSED / QUALIFIED.

Proved deterministic visibility-safe graph projection without making a renderer authoritative.

### Wave 3

Graph renderer and deterministic layout: CLOSED / QUALIFIED.

Proved server-computed ELK layout and a thin React Flow client renderer.

### Wave 4

Unified activation and route-driven focus: CLOSED / QUALIFIED.

GitHub Actions Web CI run 12: PASS.

- registry tests: PASS;
- graph projection tests: PASS;
- graph focus tests: PASS;
- ELK layout tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

Wave 4 provides:

- keyboard-accessible graph node navigation;
- canonical browser URL as active-node authority;
- direct URLs and browser history through normal Next.js routing;
- stable route-driven graph focus without re-layout;
- public-only graph search;
- Ctrl/Cmd+K search shortcut;
- registry-derived breadcrumbs;
- existing page-card and related-node links through canonical routes;
- reduced-motion-aware viewport transitions.

## Current local-showcase capability

A fresh clone can now launch an interactive Superior MI network locally.

The user can:

- pan and zoom the graph;
- navigate by clicking graph nodes;
- use keyboard-accessible graph-node buttons;
- search public graph nodes;
- move through conventional page links and breadcrumbs;
- directly load canonical URLs;
- use browser back and forward;
- see the graph focus update from route state;
- inspect active, building, research, planned, and future areas.

This is the first testable showcase checkpoint, not the final R0 qualification.

## Next authorized wave

Wave 5: page rendering system and showcase content structure.

Wave 5 must keep pages data/content-driven. Do not create one bespoke component for every site node.

## Remaining R0 direction

- Wave 5: reusable page/content system;
- Wave 6: visual identity and polished interaction language;
- Wave 7: showcase content;
- Wave 8: fresh-clone local qualification and ordinary-node extension proof.

Final intended R0 marker:

~~~text
SUPERIOR_MI_WEB_R0_LOCAL_SHOWCASE=PASS
~~~

Deployment to a public domain remains outside the R0 local-showcase gate.

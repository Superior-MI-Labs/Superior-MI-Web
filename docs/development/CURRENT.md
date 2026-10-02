# Superior MI Web Current Development State

Captured: 2026-10-01

Program: Superior MI Web R0

Current wave: Wave 1, application skeleton.

Branch:

~~~text
feature/registry-routing-r0
~~~

## Closed gates

Wave 0 is merged.

Wave 0 established:

- one canonical SiteRegistry authority;
- canonical parent hierarchy separate from typed relationships;
- real browser routes;
- one future node-activation path;
- deterministic graph requirement;
- server-side visibility projection requirement;
- ordinary-node extension acceptance test.

A follow-up correction removed duplicate AIR/product identities from the Hub subtree before implementation began.

## Current objective

Prove the registry and route contracts before adding any graph renderer.

## Implemented in Wave 1 branch

- Next.js App Router skeleton;
- TypeScript;
- 36-node initial SiteRegistry;
- strict structural registry validation;
- canonical route derivation;
- reverse route lookup;
- breadcrumbs derived from hierarchy;
- public placeholder page rendering;
- public root navigation derived from registry;
- authenticated Hub child nodes excluded from public rendering;
- Vitest registry tests;
- GitHub Actions test/typecheck/build workflow.

## Current stack

- Next.js 16.3.8
- React 19.3.0
- TypeScript 7.0.2
- Vitest 5.0.3

React Flow and ELK are intentionally not dependencies yet. They belong to Wave 3 after graph projection is proven in Wave 2.

## Local registry preflight

A dependency-free local TypeScript preflight compiled the registry core and exercised:

- AIR route derivation;
- reverse route lookup;
- breadcrumb derivation;
- ordinary Energy-node extension.

Result:

~~~text
REGISTRY_PREFLIGHT=PASS
nodes=36
~~~

## Wave 1 exit checklist

- [x] Next.js application skeleton committed
- [x] SiteRegistry contract implemented
- [x] initial registry data implemented
- [x] route derivation implemented
- [x] reverse route lookup implemented
- [x] generic placeholder page renderer implemented
- [x] ordinary-node extension test implemented
- [x] structural failure tests implemented
- [x] CI workflow implemented
- [x] GitHub CI passes
- [ ] Wave 1 merged to main

## CI result

GitHub Actions Web CI run 2: PASS.

- registry tests: PASS;
- TypeScript: PASS;
- production Next.js build: PASS.

## Next gate

Wave 2, graph projection.

Do not add React Flow until Wave 1 CI passes and the registry/routing branch is merged.

## R0 endpoint

A fresh local clone launches an interactive graph-based Superior MI site and passes the extension test.

Deployment to a public domain is outside the R0 local-showcase gate.

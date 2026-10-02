# Superior MI Web Current Development State

Captured: 2026-10-01

Program: Superior MI Web R0

Current wave: Wave 0, architecture freeze.

Branch:

~~~text
architecture/registry-r0
~~~

## Objective

Freeze the minimum architecture needed to build a locally runnable, interactive Superior MI network site without creating parallel sitemap, navigation, routing, graph, or page authorities.

## Current decisions

- Repository: Superior-MI-Labs/Superior-MI-Web
- Visibility: private
- Web framework target: Next.js App Router + TypeScript
- Graph interaction target: React Flow
- Automatic layout target: ELK
- Canonical structure authority: SiteRegistry
- Graph role: derived projection
- URL role: canonical browser navigation state
- Content role: page material, not hierarchy authority
- Private visibility: server-side projection before client delivery

## Wave 0 exit checklist

- [x] architecture authority documented
- [x] cross-project boundaries documented
- [x] sitemap R0 documented
- [x] node contract documented
- [x] hierarchy versus relationships documented
- [x] visibility boundary documented
- [x] development waves documented
- [x] extension acceptance test documented
- [ ] architecture branch reviewed
- [ ] Wave 0 merged to main

## Next authorized work

After Wave 0 review and merge:

Wave 1, application skeleton.

Wave 1 must prove registry and route contracts before adding the graph renderer.

## R0 endpoint

A fresh local clone launches an interactive graph-based Superior MI site and passes the extension test.

Deployment to a public domain is outside the R0 local-showcase gate.

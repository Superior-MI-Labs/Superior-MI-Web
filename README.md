# Superior MI Web

Public development repository for the Superior MI public website, interactive ecosystem explorer, future web applications, and future authenticated Hub.

## Current program

**Superior MI Web R0**

Current stage: **Wave 0, architecture freeze**

The R0 endpoint is a locally runnable showcase where the Superior MI ecosystem can be explored as a deterministic interactive node graph while retaining normal web routing, direct links, browser history, accessible navigation, and reusable page rendering.

## Core architecture

~~~text
SiteRegistry
    |
    +--> routes
    +--> navigation
    +--> breadcrumbs
    +--> search
    +--> graph projection
    +--> page resolution
~~~

The graph is a visual projection of site structure. It is not a second source of truth.

## R0 target stack

- Next.js App Router
- React
- TypeScript
- React Flow
- ELK

Dependencies are introduced only when their wave requires them.

## Development

Read in this order:

1. AGENTS.md
2. ARCHITECTURE.md
3. INVARIANTS.md
4. docs/development/CURRENT.md
5. docs/development/WAVES.md
6. docs/architecture/SITE-MAP.md
7. docs/architecture/NODE-CONTRACT.md

## Design goal

Superior MI should feel like a place to explore rather than a brochure site.

That visual ambition sits on a deliberately simple architecture: one structural authority, derived projections, real routes, reusable renderers, deterministic layout, and explicit boundaries with the systems the site presents.

## Current maturity

This repository is private and pre-R0.

Do not interpret documented future areas such as the Hub, Manufacturing, cloud AIR access, API accounts, or other planned services as production capabilities until their owning systems establish that state.


## Public GitHub Pages showcase

The public, static showcase is published at:

https://superior-mi-labs.github.io/Superior-MI-Web/

The existing `.github/workflows/ci.yml` is the single verification and deployment workflow.
Pull requests run tests, typechecks and a Pages static-export build. Successful pushes
to `main` also upload and deploy the generated `out/` site.

For a local dev server, use `npm install && npm run dev` (site at `/`).
To reproduce the Pages build locally, use `GITHUB_PAGES=true npm run build`.
The Pages build applies the repository base path and emits static routes for public
registry entries. GitHub Pages cannot host the planned authenticated Hub, dynamic
API routes, or other server-backed capabilities; those require a separate service.

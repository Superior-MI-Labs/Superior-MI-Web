# Superior MI Web

Private development repository for the Superior MI public website, interactive ecosystem explorer, future web applications, and future authenticated Hub.

## Current program

**Superior MI Web R0**

Current checkpoint: **Wave 4 closed and qualified**

The repository now contains a locally runnable interactive Superior MI network. The sitemap, routes, graph, search, breadcrumbs, and page identities derive from one canonical SiteRegistry.

This is an intermediate showcase checkpoint. R0 still has page-system, visual-polish, content, and final fresh-clone qualification waves remaining.

## Local quick start

Requirements:

- Node.js 20.9 or newer;
- npm;
- access to this private repository.

Clone and launch:

~~~bash
git clone git@github.com:Superior-MI-Labs/Superior-MI-Web.git
cd Superior-MI-Web
npm install
npm run dev
~~~

Then open:

~~~text
http://localhost:3000
~~~

Run the current verification suite:

~~~bash
npm run verify
~~~

That runs tests, TypeScript checking, and a production Next.js build.

## Current interaction

The local site already supports:

- deterministic Superior MI network layout;
- pan and zoom;
- clickable and keyboard-accessible graph nodes;
- route-driven focus;
- public-node search;
- Ctrl/Cmd+K search shortcut;
- direct URLs;
- browser back and forward;
- registry-derived breadcrumbs;
- responsive desktop and mobile presentation;
- explicit maturity states for unfinished areas.

## Core architecture

~~~text
SiteRegistry
    |
    +--> routes
    +--> navigation
    +--> breadcrumbs
    +--> graph projection
    |       |
    |       +--> ELK server layout
    |               |
    |               +--> React Flow client renderer
    |
    +--> page resolution
~~~

The browser URL owns active page identity.

The graph is a visual projection of site structure. It is not a second source of truth.

## Current stack

- Next.js App Router
- React
- TypeScript
- React Flow
- ELK
- Vitest

## Development

Read in this order:

1. AGENTS.md
2. ARCHITECTURE.md
3. INVARIANTS.md
4. docs/development/CURRENT.md
5. docs/development/WAVES.md
6. docs/architecture/SITE-MAP.md
7. docs/architecture/NODE-CONTRACT.md
8. docs/decisions/

## Design goal

Superior MI should feel like a place to explore rather than a brochure site.

That visual ambition sits on a deliberately simple architecture: one structural authority, derived projections, real routes, reusable renderers, deterministic layout, and explicit boundaries with the systems the site presents.

## Current maturity

This repository is private and pre-R0.

Do not interpret documented future areas such as the Hub, Manufacturing, cloud AIR access, API accounts, or other planned services as production capabilities until their owning systems establish that state.

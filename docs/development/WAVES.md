# Superior MI Web R0 Development Waves

The R0 target is a qualified local showcase, not production deployment.

## Wave 0: architecture freeze

Build no visual graph yet.

Deliver:

- architecture;
- invariants;
- sitemap;
- node contract;
- wave plan;
- current-state authority.

Exit:

- one owner exists for each web responsibility;
- hierarchy and relationships are distinct;
- local-showcase acceptance criteria are explicit.

## Wave 1: application skeleton

Implement:

- Next.js App Router;
- TypeScript;
- SiteRegistry schema;
- initial registry data;
- route derivation and reverse lookup;
- placeholder page renderer;
- unit tests.

Do not add React Flow in this wave.

Exit:

- node to route is deterministic;
- route to node is deterministic;
- direct pages render from registry data;
- invalid structure fails explicitly.

## Wave 2: graph projection

Implement:

- registry to graph projection;
- hierarchy edges;
- typed relationship edges;
- graph projection tests.

No rich animation required.

Exit:

- graph accurately represents registry structure;
- graph owns no independent site facts.

## Wave 3: graph renderer and deterministic layout

Implement:

- React Flow;
- custom Superior MI node component;
- ELK layout;
- pan;
- zoom;
- fit;
- focus;
- responsive graph shell.

Exit:

- graph is usable locally;
- equivalent input produces stable layout;
- missing custom icons use fallback assets.

## Wave 4: unified navigation

Implement one activation pipeline for:

- node click;
- top navigation;
- breadcrumbs;
- search;
- related-node links;
- direct-route initialization.

Exit:

- browser back and forward work;
- refresh works;
- graph focus follows route;
- no page-specific activation functions exist for ordinary nodes.

## Wave 5: page system

Implement:

- NodePageShell;
- page renderer registry;
- initial page types;
- related-node presentation;
- status presentation;
- placeholder content support.

Exit:

- normal page variation is data-driven;
- specialized renderers are explicit and rare.

## Wave 6: visual system

Implement:

- design tokens;
- typography;
- node states;
- edge states;
- depth;
- motion;
- Lake Superior and Upper Michigan visual identity;
- reduced-motion behavior;
- responsive behavior.

Exit:

- the site feels like one interactive environment rather than a collection of templates.

## Wave 7: showcase content

Populate enough real content to demonstrate:

- Superior MI;
- Ecosystem;
- Foundation;
- Technologies;
- Labs;
- Compute;
- Manufacturing;
- AIR;
- Community;
- Developers;
- About;
- Hub.

Future and incomplete areas may remain clear placeholders.

Exit:

- a visitor can understand current work, future direction, and how the ecosystem connects.

## Wave 8: local showcase qualification

From a fresh clone:

~~~text
npm install
npm test
npm run build
npm run dev
~~~

Verify:

- desktop navigation;
- responsive/mobile navigation;
- direct URL;
- refresh;
- browser back/forward;
- graph focus;
- search;
- keyboard access;
- reduced motion;
- missing icon fallback;
- placeholder page fallback;
- invalid registry rejection.

Run the extension test by adding one ordinary node without editing application plumbing.

Final marker:

~~~text
SUPERIOR_MI_WEB_R0_LOCAL_SHOWCASE=PASS
~~~

## Explicitly postponed

Unless evidence forces earlier work, R0 does not build:

- authentication;
- database;
- CMS;
- billing;
- cloud AIR inference;
- API accounts;
- teams;
- desktop Hub;
- live status backend;
- WebSocket architecture;
- 3D graph rendering.

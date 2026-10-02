# ADR 0003: Browser URL Owns Active Node Identity

Status: accepted for Wave 4.

## Context

Superior MI Web can be entered and navigated through several surfaces:

- direct URLs;
- browser back and forward;
- top navigation;
- breadcrumbs;
- page cards;
- related-node links;
- graph nodes;
- network search.

Creating a separate global active-node store would duplicate browser navigation state and require synchronization between two authorities.

## Decision

The canonical browser URL owns active page identity.

The server resolves the route through SiteRegistry and passes the resulting canonical node id into the shared NodeExperience.

Declarative navigation surfaces use ordinary links to registry-derived routes.

Imperative client surfaces use one small route activation hook that calls the Next.js router with the canonical projected route.

## Graph focus

Route-derived active identity determines the graph focus neighborhood.

The focus projection includes:

- active node;
- canonical parent;
- canonical children;
- direct visible relationship neighbors.

The graph does not re-layout during focus changes.

Instead, the existing deterministic layout is preserved and the viewport fits the relevant neighborhood while unrelated nodes recede visually.

This preserves spatial memory.

## Search

Wave 4 search is a derived client filter over already-authorized graph nodes.

It does not maintain a second search index or fetch hidden registry data.

Selecting a result activates its canonical route through the same imperative route hook used by graph nodes.

## Accessibility

Graph nodes are keyboard-accessible buttons.

Conventional navigation, breadcrumbs, page cards, and related-node links remain ordinary links.

The graph is therefore an enhanced navigation surface, not the only navigation mechanism.

## Consequences

Positive:

- direct links, refresh, browser history, and graph focus cannot disagree about active identity;
- no global client navigation store is required;
- future authenticated projections can preserve the same contract;
- React Flow remains presentation state rather than navigation authority.

Tradeoff:

- route changes pass through normal Next.js navigation rather than mutating page content entirely inside local client state.

That tradeoff is intentional because URL correctness is more valuable than avoiding a normal application navigation.

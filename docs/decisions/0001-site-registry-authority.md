# ADR 0001: One Site Registry Authority

Status: accepted for R0 architecture branch.

## Context

Superior MI Web needs to present the same information structure through:

- routes;
- graph nodes;
- graph hierarchy;
- top navigation;
- breadcrumbs;
- search;
- mobile navigation;
- page rendering;
- icon lookup.

Maintaining separate configuration for those surfaces would create multiple sources of truth and make every site addition a cross-cutting code change.

## Decision

Use one canonical SiteRegistry for structural node data.

All normal structural views derive from it.

The graph renderer receives a projection of the registry and is not allowed to become an editable structural authority.

Content may be stored separately but may not redefine hierarchy.

## Consequences

Positive:

- ordinary node additions are primarily data changes;
- graph and conventional navigation stay synchronized;
- direct URLs remain first-class;
- future account-specific visibility can project the same registry;
- the graph renderer can be replaced without rewriting information architecture.

Tradeoffs:

- registry validation must be strict;
- projection code becomes important infrastructure;
- specialized pages require an explicit renderer boundary rather than ad hoc routing.

## Rejected approach: filesystem as authority

Inferring all structure from icon or content filenames appears simple but makes filesystem naming responsible for semantics such as status, visibility, relationships, and page type.

Filesystem conventions will mirror registry identity, but the filesystem is not the semantic authority.

## Rejected approach: graph as authority

Using React Flow node state as the site model would make browser UI state responsible for routing and information architecture.

The graph remains a client-facing projection instead.

# Site Node Contract R0

## Goal

A normal Superior MI web node should contain enough information for the application to derive its canonical route, hierarchy, navigation identity, graph identity, content renderer, search representation, and icon location.

## Proposed TypeScript shape

~~~text
SiteNode {
  id
  parent
  slug

  title
  shortTitle
  summary

  type
  status
  visibility

  relationships
  layout
}
~~~

## Required fields

### id

Stable dotted identity.

Examples:

~~~text
ecosystem
ecosystem.foundation
ecosystem.technologies
ecosystem.technologies.air
~~~

The id is not presentation copy.

### parent

Canonical parent node id.

Root-level nodes use the documented root convention.

### slug

Single route segment owned by the node.

Route derivation walks the parent chain.

### title

Canonical display title.

### shortTitle

Compact display name for graph nodes and constrained navigation.

### summary

Short public-safe description suitable for cards, search, and graph previews.

### type

Initial allowed values:

- landing;
- organization;
- product;
- research;
- community;
- developer;
- utility.

PageRendererRegistry selects the renderer from type.

### status

Initial allowed values:

- active;
- building;
- research;
- planned;
- future.

Status describes maturity, not access.

### visibility

Initial allowed values:

- public;
- authenticated;
- internal;
- private.

Visibility projection occurs server-side before unauthorized clients receive node data.

## Relationships

Relationships are separate from parent hierarchy.

Proposed shape:

~~~text
{
  target: "ecosystem.compute",
  type: "uses"
}
~~~

Relationship type is semantic data, not rendering instructions.

## Layout hints

Layout is intentionally small.

Possible R0 hints:

~~~text
{
  importance: "primary" | "normal" | "secondary",
  cluster?: string
}
~~~

Do not make absolute coordinates part of the normal authoring contract.

## Derived route

Example:

~~~text
ecosystem.technologies.air

parent chain:
ecosystem
ecosystem.technologies
ecosystem.technologies.air

route:
/ecosystem/technologies/air
~~~

A later explicit route override may be added only if real information architecture requires one.

## Derived icon

Default icon resolver:

~~~text
ecosystem.technologies.air
    ->
/nodes/ecosystem/technologies/air.svg
~~~

If no exact asset exists:

1. try type-specific icon;
2. fall back to generic node icon.

## Content

Content identity follows node identity but remains a separate concern.

The graph does not parse content files to determine hierarchy.

The content system does not redefine the graph.

## Extension acceptance test

Adding:

~~~text
ecosystem.energy
~~~

with one registry entry must automatically produce:

- canonical route;
- graph node;
- hierarchy edge;
- breadcrumb;
- search entry;
- navigation projection where policy includes it;
- icon lookup;
- page renderer selection.

Optional content and SVG artwork may improve the page but must not be required for structural correctness.

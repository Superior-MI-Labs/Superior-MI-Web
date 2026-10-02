# Superior MI Web Sitemap R0

Status: proposed R0 structure for implementation.

This map describes information architecture. It does not assert that every branch or capability is currently operational.

~~~text
Superior MI
|
+-- Ecosystem
|   |
|   +-- Foundation
|   |
|   +-- Technologies
|   |   |
|   |   +-- AIR
|   |   +-- Applications
|   |   +-- Platform
|   |
|   +-- Labs
|   |   |
|   |   +-- Research
|   |   +-- Experiments
|   |   +-- Digital Personalities
|   |
|   +-- Compute
|   |
|   +-- Manufacturing
|
+-- Community
|   |
|   +-- Upper Peninsula
|   +-- Projects
|   +-- Partners
|   +-- Get Involved
|
+-- Developers
|   |
|   +-- Documentation
|   +-- API
|   +-- Open Source
|   +-- Status
|
+-- About
|   |
|   +-- Mission
|   +-- Roadmap
|   +-- Field Notes
|   +-- Careers
|   +-- Contact
|
+-- Hub
    |
    +-- Workspace
    +-- App Library
    +-- Projects
    +-- Developer Console
    +-- Compute Console
    +-- Account
~~~

## Canonical identity rule

A product or system gets one canonical information node.

AIR is canonically:

~~~text
Ecosystem
  Technologies
    AIR
~~~

Hub surfaces may launch, control, or relate to AIR, but they do not create a second AIR information identity.

The same rule applies to Compute, Applications, Developer Platform, and other cross-cutting systems.

## Top navigation

R0 should expose a restrained top-level navigation rather than mirroring every node.

Initial candidate:

~~~text
Explore | Technology | Community | Developers | About | AIR | Sign In
~~~

Top-navigation entries resolve to canonical registry nodes or explicit product actions. They do not own their own duplicate page map.

## Hub boundary

The Hub is a future authenticated application environment.

Its children represent user-facing workspaces and consoles, not duplicate public product pages.

Examples:

- Workspace may launch AIR or another available capability.
- App Library may expose applications registered elsewhere.
- Developer Console may manage future API resources.
- Compute Console may manage future compute resources.

Those surfaces can relate to canonical product nodes without becoming competing authorities.

## Maturity

Initial content should use explicit maturity where relevant:

- active;
- building;
- research;
- planned;
- future.

The current public center remains Superior MI Labs. Broader organizational areas should be presented according to their real maturity.

## Digital personalities

Digital Personalities is the public-facing research area.

Private personality systems are not automatically members of the public sitemap.

Kisha remains private unless the owning Kisha authority and the user explicitly change that status.

## Initial relationship examples

Hierarchy does not express all meaningful connections.

Expected R0 relationship examples include:

~~~text
AIR -> Labs
AIR -> Compute
AIR -> Developers
AIR -> Hub
AIR -> Applications

Foundation -> Community

Compute -> Developers
Compute -> Manufacturing
Compute -> Hub.Compute Console

Applications -> Hub.App Library
Platform -> Hub.Developer Console

Digital Personalities -> Research
Digital Personalities -> Experiments
~~~

Exact relationship labels will be frozen with the registry schema.

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
|   |   +-- Apps
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
    +-- AIR
    +-- Apps
    +-- Projects
    +-- Developer
    +-- Compute
    +-- Account
~~~

## Top navigation

R0 should expose a restrained top-level navigation rather than mirroring every node.

Initial candidate:

~~~text
Explore | Technology | Community | Developers | About | Launch AIR | Sign In
~~~

Top-navigation entries resolve to canonical registry nodes or explicit product actions. They do not own their own duplicate page map.

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
AIR -> Apps

Foundation -> Community

Compute -> Developers
Compute -> Manufacturing

Digital Personalities -> Research
Digital Personalities -> Experiments
~~~

Exact relationship labels will be frozen with the registry schema.

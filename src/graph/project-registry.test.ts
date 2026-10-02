import { describe, expect, it } from "vitest";
import {
  createSiteRegistry,
  SITE_NODES,
  siteRegistry,
  type SiteNodeDefinition,
} from "../registry";
import { projectRegistryToGraph } from "./project-registry";

describe("projectRegistryToGraph", () => {
  it("projects only public nodes by default", () => {
    const graph = projectRegistryToGraph(siteRegistry);

    expect(graph.nodes).toHaveLength(30);
    expect(graph.nodes.some((node) => node.id === "hub.workspace")).toBe(false);
    expect(graph.nodes.some((node) => node.id === "hub.app-library")).toBe(
      false,
    );
  });

  it("projects canonical hierarchy edges", () => {
    const graph = projectRegistryToGraph(siteRegistry);

    expect(graph.edges).toContainEqual({
      id: "hierarchy:ecosystem.technologies->ecosystem.technologies.air",
      source: "ecosystem.technologies",
      target: "ecosystem.technologies.air",
      kind: "hierarchy",
    });
  });

  it("projects visible typed relationships", () => {
    const graph = projectRegistryToGraph(siteRegistry);

    expect(graph.edges).toContainEqual({
      id: "relationship:ecosystem.technologies.air:researches->ecosystem.labs",
      source: "ecosystem.technologies.air",
      target: "ecosystem.labs",
      kind: "relationship",
      relationshipType: "researches",
    });
  });

  it("drops relationships to nodes outside the visibility projection", () => {
    const graph = projectRegistryToGraph(siteRegistry);

    expect(
      graph.edges.some(
        (edge) =>
          edge.target === "hub.app-library" ||
          edge.target === "hub.compute-console" ||
          edge.target === "hub.developer-console",
      ),
    ).toBe(false);
  });

  it("can explicitly project authenticated nodes for future server-side use", () => {
    const graph = projectRegistryToGraph(siteRegistry, {
      allowedVisibilities: ["public", "authenticated"],
    });

    expect(graph.nodes.some((node) => node.id === "hub.workspace")).toBe(true);
    expect(
      graph.edges.some((edge) => edge.target === "hub.app-library"),
    ).toBe(true);
  });

  it("keeps every projected route round-trippable through the registry", () => {
    const graph = projectRegistryToGraph(siteRegistry);

    for (const node of graph.nodes) {
      expect(siteRegistry.resolveRoute(node.route)?.id).toBe(node.id);
    }
  });

  it("keeps projection order deterministic", () => {
    const first = projectRegistryToGraph(siteRegistry);
    const second = projectRegistryToGraph(siteRegistry);

    expect(second).toEqual(first);
    expect(first.nodes.map((node) => node.id)).toEqual(
      [...first.nodes.map((node) => node.id)].sort(),
    );
    expect(first.edges.map((edge) => edge.id)).toEqual(
      [...first.edges.map((edge) => edge.id)].sort(),
    );
  });

  it("automatically projects an ordinary extension node", () => {
    const energy: SiteNodeDefinition = {
      id: "ecosystem.energy",
      parent: "ecosystem",
      slug: "energy",
      title: "Superior MI Energy",
      shortTitle: "Energy",
      summary: "Architecture acceptance-test node.",
      type: "organization",
      status: "future",
      visibility: "public",
    };

    const extended = createSiteRegistry([...SITE_NODES, energy]);
    const graph = projectRegistryToGraph(extended);

    expect(graph.nodes).toContainEqual(
      expect.objectContaining({
        id: "ecosystem.energy",
        route: "/ecosystem/energy",
      }),
    );
    expect(graph.edges).toContainEqual({
      id: "hierarchy:ecosystem->ecosystem.energy",
      source: "ecosystem",
      target: "ecosystem.energy",
      kind: "hierarchy",
    });
  });
});

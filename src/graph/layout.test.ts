import { describe, expect, it } from "vitest";
import { siteRegistry } from "../registry";
import { layoutSiteGraph } from "./layout";
import { projectRegistryToGraph } from "./project-registry";

describe("layoutSiteGraph", () => {
  it("positions every public node with finite geometry", async () => {
    const graph = projectRegistryToGraph(siteRegistry);
    const layout = await layoutSiteGraph(graph);

    expect(layout.nodes).toHaveLength(graph.nodes.length);

    for (const node of layout.nodes) {
      expect(Number.isFinite(node.position.x)).toBe(true);
      expect(Number.isFinite(node.position.y)).toBe(true);
      expect(node.width).toBeGreaterThan(0);
      expect(node.height).toBeGreaterThan(0);
    }
  });

  it("keeps the root above its first hierarchy level", async () => {
    const layout = await layoutSiteGraph(projectRegistryToGraph(siteRegistry));
    const root = layout.nodes.find((node) => node.id === "home");
    const ecosystem = layout.nodes.find((node) => node.id === "ecosystem");

    expect(root).toBeDefined();
    expect(ecosystem).toBeDefined();
    expect(root!.position.y).toBeLessThan(ecosystem!.position.y);
  });

  it("is deterministic for equivalent graph input", async () => {
    const graph = projectRegistryToGraph(siteRegistry);
    const first = await layoutSiteGraph(graph);
    const second = await layoutSiteGraph(graph);

    expect(second).toEqual(first);
  });

  it("preserves relationship edges without using them as layout constraints", async () => {
    const graph = projectRegistryToGraph(siteRegistry);
    const layout = await layoutSiteGraph(graph);

    expect(
      layout.edges.filter((edge) => edge.kind === "relationship"),
    ).toEqual(graph.edges.filter((edge) => edge.kind === "relationship"));
  });
});

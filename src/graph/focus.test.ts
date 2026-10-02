import { describe, expect, it } from "vitest";
import { siteRegistry } from "../registry";
import { getFocusNodeIds } from "./focus";
import { projectRegistryToGraph } from "./project-registry";

const graph = projectRegistryToGraph(siteRegistry);

describe("getFocusNodeIds", () => {
  it("focuses the root and its direct children", () => {
    const focused = getFocusNodeIds(graph, "home");

    expect(focused).toContain("home");
    expect(focused).toContain("ecosystem");
    expect(focused).toContain("community");
    expect(focused).toContain("developers");
    expect(focused).toContain("about");
    expect(focused).toContain("hub");
    expect(focused).not.toContain("ecosystem.labs.research");
  });

  it("focuses a node, its parent, children, and direct relationships", () => {
    const focused = getFocusNodeIds(graph, "ecosystem.technologies.air");

    expect(focused).toContain("ecosystem.technologies.air");
    expect(focused).toContain("ecosystem.technologies");
    expect(focused).toContain("ecosystem.labs");
    expect(focused).toContain("ecosystem.compute");
    expect(focused).toContain("developers");
    expect(focused).toContain("hub");
    expect(focused).toContain("ecosystem.technologies.applications");
  });

  it("does not leak authenticated relationship targets into public focus", () => {
    const focused = getFocusNodeIds(
      graph,
      "ecosystem.technologies.applications",
    );

    expect(focused).not.toContain("hub.app-library");
  });

  it("returns an empty focus set for a node outside the projection", () => {
    expect(getFocusNodeIds(graph, "hub.workspace")).toEqual([]);
  });

  it("is deterministic", () => {
    expect(getFocusNodeIds(graph, "ecosystem.labs")).toEqual(
      getFocusNodeIds(graph, "ecosystem.labs"),
    );
  });
});

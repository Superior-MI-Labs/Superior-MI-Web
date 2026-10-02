import { describe, expect, it } from "vitest";
import { createSiteRegistry } from "./registry";
import { SITE_NODES, siteRegistry } from "./site-registry";
import type { SiteNodeDefinition } from "./types";

describe("SiteRegistry", () => {
  it("derives the AIR route from the canonical hierarchy", () => {
    expect(siteRegistry.getRoute("ecosystem.technologies.air")).toBe(
      "/ecosystem/technologies/air",
    );
  });

  it("resolves routes back to canonical nodes", () => {
    expect(
      siteRegistry.resolveRoute("/ecosystem/technologies/air/")?.id,
    ).toBe("ecosystem.technologies.air");
  });

  it("normalizes query strings and hashes during route lookup", () => {
    expect(
      siteRegistry.resolveRoute(
        "/ecosystem/technologies/air?source=test#details",
      )?.id,
    ).toBe("ecosystem.technologies.air");
  });

  it("derives breadcrumbs from the same hierarchy", () => {
    expect(
      siteRegistry
        .getBreadcrumbs("ecosystem.technologies.air")
        .map((crumb) => crumb.title),
    ).toEqual(["Superior MI", "Ecosystem", "Technologies", "AIR"]);
  });

  it("passes the ordinary-node extension test without plumbing changes", () => {
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

    expect(extended.getRoute("ecosystem.energy")).toBe("/ecosystem/energy");
    expect(extended.resolveRoute("/ecosystem/energy")?.id).toBe(
      "ecosystem.energy",
    );
    expect(
      extended.getChildren("ecosystem").some((node) => node.id === energy.id),
    ).toBe(true);
    expect(
      extended.getBreadcrumbs("ecosystem.energy").map((crumb) => crumb.title),
    ).toEqual(["Superior MI", "Ecosystem", "Energy"]);
  });

  it("rejects duplicate ids", () => {
    expect(() =>
      createSiteRegistry([...SITE_NODES, SITE_NODES[1]]),
    ).toThrow(/Duplicate site node id/);
  });

  it("rejects missing parents", () => {
    const broken: SiteNodeDefinition = {
      id: "missing.child",
      parent: "missing",
      slug: "child",
      title: "Broken",
      shortTitle: "Broken",
      summary: "Broken fixture.",
      type: "utility",
      status: "future",
      visibility: "public",
    };

    expect(() => createSiteRegistry([...SITE_NODES, broken])).toThrow(
      /missing parent/,
    );
  });

  it("rejects hierarchy ids that drift from parent and slug", () => {
    const broken: SiteNodeDefinition = {
      id: "ecosystem.wrong",
      parent: "ecosystem",
      slug: "right",
      title: "Broken",
      shortTitle: "Broken",
      summary: "Broken fixture.",
      type: "utility",
      status: "future",
      visibility: "public",
    };

    expect(() => createSiteRegistry([...SITE_NODES, broken])).toThrow(
      /must mirror hierarchy/,
    );
  });

  it("rejects duplicate sibling slugs", () => {
    const broken: SiteNodeDefinition = {
      id: "ecosystem.labs-duplicate",
      parent: "ecosystem",
      slug: "labs",
      title: "Broken",
      shortTitle: "Broken",
      summary: "Broken fixture.",
      type: "utility",
      status: "future",
      visibility: "public",
    };

    expect(() => createSiteRegistry([...SITE_NODES, broken])).toThrow(
      /Duplicate sibling slug/,
    );
  });

  it("rejects missing relationship targets", () => {
    const brokenNodes: SiteNodeDefinition[] = SITE_NODES.map((node) =>
      node.id === "community"
        ? {
            ...node,
            relationships: [
              {
                target: "does-not-exist",
                type: "related" as const,
              },
            ],
          }
        : node,
    );

    expect(() => createSiteRegistry(brokenNodes)).toThrow(
      /missing relationship target/,
    );
  });
});

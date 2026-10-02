import { siteRegistry } from "../registry";
import { layoutSiteGraph, type PositionedSiteGraph } from "./layout";
import { projectRegistryToGraph } from "./project-registry";

let publicGraphPromise: Promise<PositionedSiteGraph> | undefined;

export function getPublicGraphLayout(): Promise<PositionedSiteGraph> {
  publicGraphPromise ??= layoutSiteGraph(projectRegistryToGraph(siteRegistry));
  return publicGraphPromise;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NodeExperience } from "@/components/node-experience";
import { siteRegistry } from "@/registry";

interface RegistryRouteProps {
  params: Promise<{
    segments: string[];
  }>;
}

function routeFromSegments(segments: string[]): string {
  return `/${segments.join("/")}`;
}

export async function generateStaticParams() {
  return siteRegistry.nodes
    .filter((node) => node.parent !== null && node.visibility === "public")
    .map((node) => ({
      segments: siteRegistry.getRoute(node.id).slice(1).split("/"),
    }));
}

export async function generateMetadata({
  params,
}: RegistryRouteProps): Promise<Metadata> {
  const { segments } = await params;
  const node = siteRegistry.resolveRoute(routeFromSegments(segments));

  if (!node || node.visibility !== "public") {
    return {};
  }

  return {
    title: node.title,
    description: node.summary,
  };
}

export default async function RegistryRoute({ params }: RegistryRouteProps) {
  const { segments } = await params;
  const node = siteRegistry.resolveRoute(routeFromSegments(segments));

  if (!node || node.visibility !== "public") {
    notFound();
  }

  return <NodeExperience node={node} />;
}

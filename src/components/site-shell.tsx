import Link from "next/link";
import type { ReactNode } from "react";
import { siteRegistry } from "@/registry";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const publicRootChildren = siteRegistry
    .getChildren(siteRegistry.rootId)
    .filter((node) => node.visibility === "public");

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/">
          <span className="brand__mark" aria-hidden="true">
            SMI
          </span>
          <span>Superior MI</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {publicRootChildren.map((node) => (
            <Link href={siteRegistry.getRoute(node.id)} key={node.id}>
              {node.shortTitle}
            </Link>
          ))}
        </nav>
      </header>

      {children}

      <footer className="site-footer">
        <span>Superior MI</span>
        <span>People • Planet • Progress</span>
      </footer>
    </div>
  );
}

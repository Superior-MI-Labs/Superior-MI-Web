import Link from "next/link";

export default function NotFound() {
  return (
    <main className="node-page">
      <section className="node-page__hero">
        <p className="eyebrow">404</p>
        <h1>Node not found</h1>
        <p className="node-page__summary">
          This route is not part of the public Superior MI registry.
        </p>
        <Link className="primary-link" href="/">
          Return to Superior MI
        </Link>
      </section>
    </main>
  );
}

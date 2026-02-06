import Link from "next/link";
import "./docs.css";

const docs = [
  { title: "Organization", href: "/docs/organization" },
  { title: "People", href: "/docs/people" },
  { title: "Process", href: "/docs/process" },
  { title: "Technology", href: "/docs/technology" },
  { title: "Data", href: "/docs/data" },
  { title: "Governance", href: "/docs/governance" },
  { title: "Scope Management", href: "/docs/scope-management" },
  { title: "Value Management", href: "/docs/value-management" },
  { title: "Administration", href: "/docs/administration" },
  { title: "Testing", href: "/docs/testing" },
  { title: "Operations", href: "/docs/operational-readiness" },
  { title: "RACI", href: "/docs/raci-chart" },
  { title: "User", href: "/docs/user" },
  { title: "Time & Expenses", href: "/docs/time-and-expense" },
];

export default function DocsIndexPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h1>Documentation</h1>
      <p>Select a section to continue.</p>

      <section className="docs-grid">
        {docs.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="doc-card">
              <h3>{doc.title}</h3>
              <p className="doc-desc">
                Learn more about {doc.title.toLowerCase()}.
              </p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

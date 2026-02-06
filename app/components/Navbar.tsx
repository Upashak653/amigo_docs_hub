"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Search } from "lucide-react";

/* ---------- TYPES ---------- */
type SearchItem = {
  id: string;
  title: string;
  slug: string;
  type: "section" | "doc";
};

/* ---------- TOP NAV SECTIONS ---------- */
const NAV_SECTIONS = [
  { label: "Organization", slug: "organization" },
  { label: "People", slug: "people" },
  { label: "Process", slug: "process" },
  { label: "Technology", slug: "technology" },
  { label: "Data", slug: "data" },
  { label: "Governance", slug: "governance" },
  { label: "Scope Management", slug: "scope-management" },
  { label: "Value Management", slug: "value-management" },
  { label: "Administration", slug: "administration" },
  { label: "Testing", slug: "testing" },
  { label: "Operational Readiness", slug: "operational-readiness" },
  { label: "RACI Chart", slug: "raci-chart" },
  { label: "User", slug: "user" },
  { label: "Time and Expense", slug: "time-and-expense" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);

  /* ---------- SEARCH LOGIC ---------- */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();

    // 1️⃣ Section matches
    const sectionMatches: SearchItem[] = NAV_SECTIONS
      .filter((s) => s.label.toLowerCase().includes(q))
      .map((s) => ({
        id: `section-${s.slug}`,
        title: s.label,
        slug: s.slug,
        type: "section",
      }));

    // 2️⃣ Docs matches
    const fetchDocs = async () => {
      const { data } = await supabase
        .from("docs")
        .select("id, title, slug")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(6);

      const docMatches: SearchItem[] =
        data?.map((d) => ({
          id: d.id,
          title: d.title,
          slug: d.slug,
          type: "doc",
        })) || [];

      setResults([...sectionMatches, ...docMatches]);
    };

    fetchDocs();
  }, [query]);

  return (
    <header className="navbar">
  {/* LEFT */}
  <div className="navbar-left">
    <Link href="/" className="navbar-logo">
      AMIGO
    </Link>

    <nav className="navbar-links">
      <Link href="/docs/organization">Organization</Link>
      <Link href="/docs/people">People</Link>
      <Link href="/docs/process">Process</Link>
      <Link href="/docs/technology">Technology</Link>
      <Link href="/docs/data">Data</Link>
      <Link href="/docs/governance">Governance</Link>

      <div className="navbar-more">
        More ▾
        <div className="navbar-more-menu">
          <Link href="/docs/scope-management">Scope Management</Link>
          <Link href="/docs/value-management">Value Management</Link>
          <Link href="/docs/administration">Administration</Link>
          <Link href="/docs/testing">Testing</Link>
          <Link href="/docs/operational-readiness">Operational Readiness</Link>
          <Link href="/docs/raci-chart">RACI Chart</Link>
          <Link href="/docs/user">User</Link>
          <Link href="/docs/time-and-expense">Time & Expense</Link>
        </div>
      </div>
    </nav>
  </div>

  {/* RIGHT */}
  <div className="navbar-right">
    <div className="navbar-search">
      <Search size={16} />
      <input
        type="text"
        placeholder="Search documentation..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {open && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((doc) => (
            <Link
              key={doc.id}
              href={`/docs/${doc.slug}`}
              className="search-item"
              onClick={() => {
                setQuery("");
                setOpen(false);
              }}
            >
              {doc.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
</header>

  );
}

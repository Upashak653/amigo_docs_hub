"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Search } from "lucide-react";

type Doc = {
  id: string;
  title: string;
  slug: string;
};

export default function Navbar() {
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);
  const [open, setOpen] = useState(false);

  const isDocs = pathname.startsWith("/docs");
  const isReleases = pathname.startsWith("/releases");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      const { data } = await supabase
        .from("docs")
        .select("id, title, slug")
        .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
        .limit(8);

      setResults(data || []);
    };

    fetchResults();
  }, [query]);

  return (
    <header className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <Link href="/docs" className="navbar-logo">
          AMIGO
        </Link>

        <nav className="navbar-tabs">
          <Link
            href="/docs"
            className={`navbar-tab ${isDocs ? "active" : ""}`}
          >
            Documentation
          </Link>

          <Link
            href="/releases"
            className={`navbar-tab ${isReleases ? "active" : ""}`}
          >
            Released Notes
          </Link>
        </nav>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <div className="navbar-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search documentation…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />

          {open && (
            <div className="search-dropdown">
              {results.length > 0 ? (
                results.map((doc) => (
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
                ))
              ) : (
                query && (
                  <div className="search-empty">
                    No results found
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT (future icons / profile) */}
      <div className="navbar-right" />
    </header>
  );
}

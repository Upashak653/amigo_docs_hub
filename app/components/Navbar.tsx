"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { Search } from "lucide-react";

type Doc = {
  id: string;
  title: string;
  slug: string;
};

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Doc[]>([]);
  const [open, setOpen] = useState(false);

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
      <Link href="/" className="navbar-title">
        Amigo Wiki Docs
      </Link>

      {/* Search */}
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
    </header>
  );
}

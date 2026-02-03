"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

type Doc = {
  id: string;
  title: string;
  slug: string;
  section: string;
};

export default function Sidebar() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      const { data } = await supabase
        .from("docs")
        .select("id, title, slug, section")
        .order("created_at");

      if (data) {
        setDocs(data);

        const initial: Record<string, boolean> = {};
        data.forEach(doc => {
          if (!(doc.section in initial)) initial[doc.section] = true;
        });
        setOpenSections(initial);
      }
    };

    fetchDocs();
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      {/* TOP TOGGLE BUTTON */}
      <div className="sidebar-toggle">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <PanelLeftClose size={18} />
          ) : (
            <PanelLeftOpen size={18} />
          )}
        </button>
      </div>

      {/* SIDEBAR CONTENT */}
      {isSidebarOpen &&
        Array.from(new Set(docs.map(d => d.section))).map(section => (
          <div key={section} className="mb-4">
            <button
              onClick={() => toggleSection(section)}
              className="sidebar-section-btn"
            >
              <span>{section}</span>
              {openSections[section] ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>

            {openSections[section] && (
              <div className="ml-3 mt-2">
                {docs
                  .filter(doc => doc.section === section)
                  .map(doc => (
                    <Link
                      key={doc.id}
                      href={`/docs/${doc.slug}`}
                      className="sidebar-link"
                    >
                      {doc.title}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
    </aside>
  );
}

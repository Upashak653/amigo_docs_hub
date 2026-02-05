import "dotenv/config"; // 👈 THIS LINE IS THE KEY
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Wiki pages to sync
const WIKI_PAGES = [
  {
    title: "Organization",
    slug: "organization",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Organization-(Road-Map).md",
  },
  {
    title: "People",
    slug: "people",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/People.md",
  },
  {
    title: "Process",
    slug: "process",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Process.md",
  },
  {
    title: "Technology",
    slug: "technology",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Technology.md",
  },
  {
    title: "Data",
    slug: "data",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Data.md",
  },
  {
    title: "Governance",
    slug: "governance",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Governance.md",
  },
  {
    title: "Scope Management",
    slug: "scope-management",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Scope-Management.md",
  },
  {
    title: "Value Management",
    slug: "value-management",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Value-Management.md",
  },
  {
    title: "Administration",
    slug: "administration",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Administration.md",
  },
  {
    title: "Testing",
    slug: "testing",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Testing.md",
  },
  {
    title: "Operational Readiness",
    slug: "operational-readiness",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Operational-Readiness.md",
  },
  {
    title: "RACI Chart",
    slug: "raci-chart",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/RACI-Chart.md",
  },
  {
    title: "User",
    slug: "user",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Users-(Detail-Page).md",
  },
  {
    title: "Time-and-Expense",
    slug: "time-and-expense",
    section: "AMIGO Road Map",
    url: "https://raw.githubusercontent.com/wiki/Platinum-PMO-LLC/amigo-wiki/Time-and-Expense.md",
  },
];

async function sync() {
  for (const page of WIKI_PAGES) {
    console.log(`Syncing: ${page.title}`);

    const res = await fetch(page.url);
    if (!res.ok) {
      console.error(`Failed to fetch ${page.url}`);
      continue;
    }

    const markdown = await res.text();

    const { error } = await supabase.from("docs").upsert({
      title: page.title,
      slug: page.slug,
      section: page.section,
      content: markdown,
    });

    if (error) {
      console.error("Supabase error:", error);
    } else {
      console.log(`✔ Synced ${page.slug}`);
    }
  }
}

sync();

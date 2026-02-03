import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  const { data } = await supabase
    .from("docs")
    .select("title, content")
    .eq("slug", slug)
    .single();

  if (!data) notFound();

  return (
    <article className="doc-content">
      <h1>{data.title}</h1>

      {/* THIS IS THE KEY PART */}
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </article>
  );
}

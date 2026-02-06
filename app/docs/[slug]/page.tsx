import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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
    
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {data.content}
      </ReactMarkdown>
    </article>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";
import { ESSAY_SLUGS, getEssay, type EssaySlug } from "@/lib/essays";

function isEssaySlug(slug: string): slug is EssaySlug {
  return (ESSAY_SLUGS as readonly string[]).includes(slug);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return ESSAY_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isEssaySlug(slug)) return {};
  const { metadata } = await getEssay(slug);
  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: metadata.date,
      tags: metadata.tags,
    },
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isEssaySlug(slug)) notFound();

  const { default: EssayContent, metadata } = await getEssay(slug);

  return (
    <article className="pb-16">
      <header className="pt-4 pb-8">
        <h1 className="font-hand text-3xl text-charcoal sm:text-4xl">{metadata.title}</h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-charcoal-soft">
          {formatDate(metadata.date)}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-charcoal-soft/30 px-2.5 py-0.5 text-xs text-sepia"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="prose prose-lg max-w-none prose-headings:font-hand prose-headings:font-normal prose-headings:text-charcoal prose-p:text-charcoal prose-p:leading-relaxed prose-a:text-sepia prose-a:no-underline prose-strong:text-charcoal prose-blockquote:border-sepia prose-blockquote:text-charcoal-soft prose-hr:border-charcoal-soft/30 prose-img:rounded-none">
        <EssayContent />
      </div>

      <Comments essaySlug={slug} />
    </article>
  );
}

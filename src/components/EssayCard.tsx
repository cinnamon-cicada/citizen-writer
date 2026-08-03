import Link from "next/link";
import type { EssaySummary } from "@/lib/essays";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EssayCard({ essay }: { essay: EssaySummary }) {
  return (
    <article className="py-6">
      <Link href={`/essays/${essay.slug}`} className="group block">
        <h2 className="font-hand text-2xl text-charcoal group-hover:text-sepia sm:text-3xl">
          {essay.title}
        </h2>
        <p className="mt-1 text-xs uppercase tracking-widest text-charcoal-soft">
          {formatDate(essay.date)} &middot; {essay.readingTime} min read
        </p>
        <p className="mt-3 leading-relaxed text-charcoal-soft">{essay.summary}</p>
      </Link>
    </article>
  );
}

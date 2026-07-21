"use client";

import { useMemo, useState } from "react";
import EssayCard from "./EssayCard";
import type { EssaySummary } from "@/lib/essays";

export default function EssaysArchive({
  essays,
  tags,
}: {
  essays: EssaySummary[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? essays.filter((essay) => essay.tags.includes(activeTag)) : essays),
    [essays, activeTag]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-3 py-1 text-sm transition-colors ${
            activeTag === null
              ? "border-sepia bg-sepia text-parchment"
              : "border-charcoal-soft/30 text-charcoal-soft hover:border-sepia hover:text-sepia"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              activeTag === tag
                ? "border-sepia bg-sepia text-parchment"
                : "border-charcoal-soft/30 text-charcoal-soft hover:border-sepia hover:text-sepia"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-4 divide-y divide-charcoal-soft/15">
        {filtered.map((essay) => (
          <EssayCard key={essay.slug} essay={essay} />
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-charcoal-soft">
            No essays tagged &ldquo;{activeTag}&rdquo; yet.
          </p>
        )}
      </div>
    </div>
  );
}

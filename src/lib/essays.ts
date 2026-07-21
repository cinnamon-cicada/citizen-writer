import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { EssayFrontmatter } from "@/lib/types";

interface EssayModule {
  default: ComponentType;
  metadata: EssayFrontmatter;
}

export const ESSAY_SLUGS = [
  "keeping-a-window-open",
  "the-discipline-of-the-blunt-pencil",
  "directions-to-a-house-that-isnt-there-anymore",
  "what-the-margins-are-for",
] as const;

export type EssaySlug = (typeof ESSAY_SLUGS)[number];

export interface EssaySummary extends EssayFrontmatter {
  slug: EssaySlug;
  readingTime: number;
}

const WORDS_PER_MINUTE = 200;

function estimateReadingTime(slug: EssaySlug): number {
  const filePath = path.join(process.cwd(), "src/content/essays", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const metadataEnd = raw.indexOf("};");
  const body = metadataEnd === -1 ? raw : raw.slice(metadataEnd + 2);
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export async function getEssay(slug: EssaySlug): Promise<EssayModule> {
  const mod = (await import(`@/content/essays/${slug}.mdx`)) as EssayModule;
  return mod;
}

export async function getAllEssays(): Promise<EssaySummary[]> {
  const essays = await Promise.all(
    ESSAY_SLUGS.map(async (slug) => {
      const { metadata } = await getEssay(slug);
      return {
        slug,
        ...metadata,
        readingTime: estimateReadingTime(slug),
      };
    })
  );
  return essays.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllTags(): Promise<string[]> {
  const essays = await getAllEssays();
  const tagSet = new Set<string>();
  essays.forEach((essay) => essay.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

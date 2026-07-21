import type { Metadata } from "next";
import EssaysArchive from "@/components/EssaysArchive";
import { getAllEssays, getAllTags } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays",
  description: "The full archive of Citizen Writer essays, filterable by tag.",
};

export default async function EssaysPage() {
  const [essays, tags] = await Promise.all([getAllEssays(), getAllTags()]);

  return (
    <div className="pb-16">
      <h1 className="font-hand text-3xl text-charcoal">Essays</h1>
      <div className="mt-6">
        <EssaysArchive essays={essays} tags={tags} />
      </div>
    </div>
  );
}

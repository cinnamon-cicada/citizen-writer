import type { Metadata } from "next";
import EssayCard from "@/components/EssayCard";
import { getAllEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays",
  description: "The full archive of Citizen Writer essays.",
};

export default async function EssaysPage() {
  const essays = await getAllEssays();

  return (
    <div className="pb-16">
      <h1 className="font-hand text-3xl text-charcoal">Essays</h1>
      <div className="mt-6 divide-y divide-charcoal-soft/15">
        {essays.map((essay) => (
          <EssayCard key={essay.slug} essay={essay} />
        ))}
        {essays.length === 0 && (
          <p className="py-10 text-charcoal-soft">Nothing published yet.</p>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import EssayCard from "@/components/EssayCard";
import { getAllEssays } from "@/lib/essays";

export default async function HomePage() {
  const essays = await getAllEssays();
  const latest = essays.slice(0, 3);

  return (
    <div className="pb-16">
      <section className="pt-4 pb-8">
        <p className="max-w-prose leading-relaxed text-charcoal-soft">
          Essays on emotions, place, and everyday life in strange little worlds —
          drafted on a MacBook, at 3am, and sometimes paired with steaming tea.
        </p>
      </section>

      <div className="divide-y divide-charcoal-soft/15">
        {latest.map((essay) => (
          <EssayCard key={essay.slug} essay={essay} />
        ))}
        {latest.length === 0 && <p className="py-6 text-charcoal-soft">Nothing published yet.</p>}
      </div>

      {latest.length > 0 && (
        <div className="mt-8">
          <Link href="/essays" className="hand-underline font-hand text-xl text-sepia">
            Read the archive &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}

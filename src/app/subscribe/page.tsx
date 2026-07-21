import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Get new Citizen Writer essays by email, roughly when they're finished.",
};

export default function SubscribePage() {
  return (
    <div className="pb-16 pt-4">
      <h1 className="font-hand text-3xl text-charcoal sm:text-4xl">Subscribe</h1>
      <p className="mt-4 max-w-prose leading-relaxed text-charcoal-soft">
        New essays arrive irregularly — whenever one is finished, not on a
        schedule. Leave your email and you&rsquo;ll hear about each one, and
        nothing else.
      </p>
      <div className="mt-8">
        <NewsletterForm />
      </div>
    </div>
  );
}

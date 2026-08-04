import type { Metadata } from "next";
import FlowerLineArt from "@/components/FlowerLineArt";

export const metadata: Metadata = {
  title: "About",
  description: "A short note on who writes Citizen Writer and why.",
};

export default function AboutPage() {
  return (
    <div className="pb-16 pt-4">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <FlowerLineArt className="h-32 w-32 shrink-0 sm:h-36 sm:w-36" />
        <h1 className="font-hand text-3xl text-charcoal sm:text-4xl">About</h1>
      </div>

      <div className="prose prose-lg mt-8 max-w-none prose-p:leading-relaxed prose-p:text-charcoal">
        <p>
          Student, author, baker, engineer. That&apos;s who I am, and I&apos;m so glad to
          meet you too :&#41;
        </p>
        <p>
          Citizen Writer is a notebook kept in public, carrying stories from both
          this world and the next. Its author has spent the better part of a 
          decade writing things down before deciding what they mean — grocery-
          list observations, half-finished arguments, the occasional sentence
          worth keeping. This is where the keeping happens.
        </p>
        <p>
          The essays here are not reporting and not advice. They are attempts
          to look closely at something ordinary — a room, a habit, a street —
          until it gives up a little more than it first offered. A touch of 
          magic in an otherwise mundane world. 
        </p>
        <p>
          If any of it is useful to you, good. If it just passes the time
          honestly, that is enough too.
        </p>
      </div>
    </div>
  );
}

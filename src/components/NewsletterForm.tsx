"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Status = "idle" | "submitting" | "success" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      await addDoc(collection(db, "subscribers"), {
        email,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-hand text-xl text-sepia">
        You&rsquo;re on the list. Thank you for reading.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="flex-1 rounded border border-charcoal-soft/40 bg-transparent px-4 py-2 text-charcoal placeholder:text-charcoal-soft/60 focus:border-sepia focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded border border-sepia px-5 py-2 text-sepia transition-colors hover:bg-sepia hover:text-parchment disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700 sm:basis-full" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

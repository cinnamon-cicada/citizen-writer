"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import PencilDivider from "./PencilDivider";

interface Comment {
  id: string;
  name: string;
  body: string;
  createdAt: Timestamp | null;
}

export default function Comments({ essaySlug }: { essaySlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const commentsQuery = query(
      collection(db, "comments"),
      where("essaySlug", "==", essaySlug),
      where("approved", "==", true),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name as string,
            body: data.body as string,
            createdAt: (data.createdAt as Timestamp) ?? null,
          };
        })
      );
    });
    return unsubscribe;
  }, [essaySlug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(false);

    // Honeypot: real visitors never see or fill this field, so a filled
    // value means a bot. Pretend it worked without writing anything.
    if (website.trim()) {
      setBody("");
      setSubmitted(true);
      setSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        essaySlug,
        name: name.trim() || "Anonymous",
        body: body.trim(),
        createdAt: serverTimestamp(),
        approved: false,
      });
      setBody("");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-16">
      <PencilDivider className="mb-8" />
      <h2 className="font-hand text-2xl text-charcoal">Notes from readers</h2>

      <ul className="mt-6 flex flex-col gap-6">
        {comments.map((comment) => (
          <li key={comment.id} className="border-l-2 border-sepia/40 pl-4">
            <p className="text-sm font-semibold text-charcoal">{comment.name}</p>
            <p className="mt-1 leading-relaxed text-charcoal-soft">{comment.body}</p>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="text-charcoal-soft">No notes yet — be the first to leave one.</li>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSubmitted(false);
          }}
          className="rounded border border-charcoal-soft/40 bg-transparent px-4 py-2 text-charcoal placeholder:text-charcoal-soft/60 focus:border-sepia focus:outline-none"
        />
        <textarea
          required
          placeholder="Leave a note…"
          value={body}
          onChange={(event) => {
            setBody(event.target.value);
            setSubmitted(false);
          }}
          rows={3}
          className="rounded border border-charcoal-soft/40 bg-transparent px-4 py-2 text-charcoal placeholder:text-charcoal-soft/60 focus:border-sepia focus:outline-none"
        />
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="self-start rounded border border-sepia px-5 py-2 text-sepia transition-colors hover:bg-sepia hover:text-parchment disabled:opacity-60"
        >
          {submitting ? "Posting…" : "Post note"}
        </button>
        {submitted && !error && (
          <p className="text-sm text-charcoal-soft" role="status">
            Thanks — your note is awaiting approval.
          </p>
        )}
        {error && (
          <p className="text-sm text-red-700" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}

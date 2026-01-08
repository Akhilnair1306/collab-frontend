
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSharedNote } from "@/lib/share.api";


export default function SharedNotePage() {
  const { token } = useParams<{ token: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedNote = async () => {
      try {
        const note = await getSharedNote(token);
        console.log(note)
        setTitle(note.title);
        setContent(note.content);
      } catch (err) {
        setError("Invalid or expired share link");
      } finally {
        setLoading(false);
      }
    };

    fetchSharedNote();
  }, [token]);

  if (loading) return <p className="p-6">Loading shared note…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="whitespace-pre-wrap text-muted-foreground">
        {content}
      </div>

      <p className="text-xs text-muted-foreground">
        Read-only shared note
      </p>
    </div>
  );
}

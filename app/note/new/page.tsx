// app/note/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { createNotes } from "@/lib/notes.api";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleCreate = async () => {
    const res = await createNotes(title,content)
    router.push(`/note/${res.data.note.id}`);
  };

  return (
    <div className="p-6 space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full h-96 border rounded p-3"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Button onClick={handleCreate}>Create Note</Button>
    </div>
  );
}

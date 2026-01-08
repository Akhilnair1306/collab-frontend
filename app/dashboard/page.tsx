// app/(dashboard)/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getMyNotes } from "@/lib/notes.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  const fetchNotes = async () => {
    const data = await getMyNotes();
    console.log("NOTES RESPONSE:", data);
    setNotes(data.notes);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    router.push("/note/new")
  };

  const navigate = async (id: string) => {
    router.push(`/note/${id}`)
  }

  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Notes</h1>
        <div className="flex gap-2">
          <Button onClick={handleCreateNote}>New Note</Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.length === 0 ? (<div> No Notes currently</div>) : (notes.map((note) => (
          <Card key={note.id} className="p-4 cursor-pointer hover:bg-muted" onClick={() => navigate(note.id)}>
            <h2 className="font-medium">
              {note.title || "Untitled Note"}
            </h2>
          </Card>
        )))}

      </div>
    </div>
  );
}

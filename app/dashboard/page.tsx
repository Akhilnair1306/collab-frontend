"use client";

import { useEffect, useMemo, useState } from "react";
import { getMyNotes, deleteNote, searchNotes } from "@/lib/notes.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { debounce } from "@/lib/debounce";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);


  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const fetchNotes = async () => {
    const data = await getMyNotes();
    setNotes(data.notes);
    setLoading(false);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) {
          fetchNotes();
          return;
        }

        setSearching(true);
        const results = await searchNotes(value);
        setNotes(results);
        setSearching(false);
      }, 500),
    []
  );


  const handleSearch = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteNote(deleteId);
    setDeleteId(null);
    fetchNotes();
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Notes</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/note/new")}>
            New Note
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="max-w-md">
        <Input
          placeholder="Search notes…"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {searching && (
          <p className="mt-1 text-xs text-zinc-500">
            Searching…
          </p>
        )}
      </div>
      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <div className="text-zinc-500">No notes yet</div>
        ) : (
          notes.map((note) => (
            <Card
              key={note.id}
              className="p-4 cursor-pointer hover:bg-muted relative"

            >
              <h2 className="font-medium truncate">
                {note.title || "Untitled Note"}
              </h2>
              <Button variant="outline" onClick={() => router.push(`/note/${note.id}`)}>
                Open
              </Button>

              {/* Delete Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(note.id);
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete note?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently
                      delete your note.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setDeleteId(null)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={handleDelete}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

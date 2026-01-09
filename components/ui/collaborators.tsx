"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCollaborators,
  addCollaborator,
  removeCollaborator,
  searchCollaborators
} from "@/lib/collaborator.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { debounce } from "@/lib/debounce";

interface Collaborator {
  id: string;
  userId: string;
  user: { email: string };
  role: "VIEWER" | "EDITOR";
}

export default function Collaborators({ noteId }: { noteId: string }) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"VIEWER" | "EDITOR">("VIEWER");

  const fetchCollaborators = async () => {
    const data = await getCollaborators(noteId);
    setCollaborators(data.collaborators);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value: string) => {
        if (!value.trim()) {
          setSearchResults([]);
          return;
        }

        setSearching(true);
        const users = await searchCollaborators(noteId, value);
        setSearchResults(users);
        setSearching(false);
      }, 400),
    [noteId]
  );


  useEffect(() => {
    fetchCollaborators();
  }, [noteId]);

  const handleAdd = async () => {
    if (!email) return;
    await addCollaborator(noteId, email, role);
    setEmail("");
    setRole("VIEWER");
    setSearchResults([]);
    fetchCollaborators();
  };


  //   const handleRoleChange = async (
  //     collaboratorId: string,
  //     newRole: "VIEWER" | "EDITOR"
  //   ) => {
  //     await updateCollaboratorRole(noteId, collaboratorId, newRole);
  //     fetchCollaborators();
  //   };

  const handleRemove = async (id: string) => {
    console.log(id)
    await removeCollaborator(noteId, id);
    fetchCollaborators();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    debouncedSearch(value);
  };

  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-medium">Collaborators</h3>

      {/* Add collaborator */}
      <div className="flex gap-2">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />

        <select
          className="border rounded px-2"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="VIEWER">Viewer</option>
          <option value="EDITOR">Editor</option>
        </select>

        <Button onClick={handleAdd}>Add</Button>
      </div>

      {searchResults.length > 0 && (
        <div className="border rounded-md bg-background shadow-sm">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
              onClick={() => {
                setEmail(user.email);
                setSearchResults([]);
              }}
            >
              {user.email}
            </div>
          ))}
        </div>
      )}

      {searching && (
        <p className="text-xs text-muted-foreground">
          Searching…
        </p>
      )}


      {/* List collaborators */}
      <div className="space-y-2">
        {collaborators.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2">
              <span>{c.user.email}</span>

              {/* <select
                className="border rounded px-1 text-xs"
                value={c.role}
                onChange={(e) =>
                  handleRoleChange(c.id, e.target.value as any)
                }
              >
                <option value="VIEWER">Viewer</option>
                <option value="EDITOR">Editor</option>
              </select> */}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(c.userId)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

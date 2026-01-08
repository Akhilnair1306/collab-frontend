"use client";

import { useEffect, useState } from "react";
import {
  getCollaborators,
  addCollaborator,
  removeCollaborator
} from "@/lib/collaborator.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Collaborator {
  id: string;
  userId: string;
  user: { email: string };
  role: "VIEWER" | "EDITOR";
}

export default function Collaborators({ noteId }: { noteId: string }) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"VIEWER" | "EDITOR">("VIEWER");

  const fetchCollaborators = async () => {
    const data = await getCollaborators(noteId);
    setCollaborators(data.collaborators);
  };

  useEffect(() => {
    fetchCollaborators();
  }, [noteId]);

  const handleAdd = async () => {
    if (!email) return;
    await addCollaborator(noteId, email, role);
    setEmail("");
    setRole("VIEWER");
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

  return (
    <Card className="p-4 space-y-3">
      <h3 className="font-medium">Collaborators</h3>

      {/* Add collaborator */}
      <div className="flex gap-2">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Collaborators from "@/components/ui/collaborators";
import { useSocketStore } from "@/store/socket.store";
import { generateShareLink } from "@/lib/share.api";
import { Button } from "@/components/ui/button";

type PresenceUser = {
    userId: string;
    email: string;
    role: "VIEWER" | "EDITOR";
    editing: boolean;
};

export default function NoteEditorPage() {
    const { id } = useParams<{ id: string }>();

    const [presence, setPresence] = useState<PresenceUser[]>([]);
    const socket = useSocketStore((s) => s.socket);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [role, setRole] = useState<"VIEWER" | "EDITOR">("VIEWER");
    const [loading, setLoading] = useState(true);

    const handleShare = async () => {
        const link = await generateShareLink(id)
        // const link = `${window.location.origin}/share/${token}`
        navigator.clipboard.writeText(link)
        alert("Share Link Copied")
    }

    let typingTimeout: NodeJS.Timeout;

    useEffect(() => {
        if (!socket || !id) return;

        socket.emit("join-note", { noteId: id });

        socket.on("note-joined", ({ title, content, myRole }) => {
            setTitle(title);
            setContent(content);
            setRole(myRole);
            setLoading(false);
        });

        socket.on("user-joined", ({ userId }) => {
            console.log("User joined:", userId);
        });

        return () => {
            socket.off("note-joined");
            socket.off("user-joined");
        };
    }, [socket, id]);

    useEffect(() => {
        if (!socket) return;

        socket.on("note-updated", ({ title, content, updatedBy }) => {
            console.log("hi")
            setTitle(title);
            setContent(content);
        });

        return () => {
            socket.off("note-updated");
        };
    }, [socket]);

    const handleTitleChange = (value: string) => {
        if (!socket || role === "VIEWER") return;

        setTitle(value);
        socket.emit("note-update", {
            noteId: id,
            title: value,
            content,
        });

        socket.emit("editing-start", { noteId: id });

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit("editing-stop", { noteId: id });
        }, 1000);
    };

    const handleContentChange = (value: string) => {
        if (!socket || role === "VIEWER") return;

        setContent(value);
        socket.emit("note-update", {
            noteId: id,
            title,
            content: value,
        });

        socket.emit("editing-start", { noteId: id });

        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit("editing-stop", { noteId: id });
        }, 1000);
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("presence-update", (users: PresenceUser[]) => {
            setPresence(users);
        });

        return () => {
            socket.off("presence-update");
        };
    }, [socket]);

    console.log(presence)

    if (loading) return <p className="p-6">Loading note…</p>;

    return (
        <div className="p-6 space-y-4">
            <Input
                placeholder="Title"
                value={title}
                disabled={role === "VIEWER"}
                onChange={(e) => handleTitleChange(e.target.value)}
            />
            <Button variant="outline" onClick={handleShare}>
                Share
            </Button>

            <Collaborators noteId={id} />
            <div className="flex gap-3 items-center text-sm text-muted-foreground">
                {presence.map((p) => (
                    <div key={p.userId} className="flex items-center gap-1">
                        <span
                            className={`h-2 w-2 rounded-full ${p.editing ? "bg-green-500" : "bg-gray-400"
                                }`}
                        />
                        <span>{p.email} ({p.role})</span>
                        {p.editing && <span>(editing)</span>}
                    </div>
                ))}
            </div>

            <textarea
                className="w-full h-[70vh] border rounded p-3"
                placeholder="Start writing..."
                value={content}
                disabled={role === "VIEWER"}
                onChange={(e) => handleContentChange(e.target.value)}
            />
        </div>
    );
}

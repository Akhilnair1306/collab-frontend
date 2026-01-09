"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllNotesAdmin, deleteNotesAdmin, getRole } from "@/lib/admin.api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { useAuthStore } from "@/store/auth.store";

export default function AdminDashboardPage() {
    const router = useRouter();

    const [notes, setNotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [roleLoading, setRoleLoading] = useState(true);
    const getUserRole = async () => {
        try {
            const data = await getRole();
            setUserRole(data);
        } finally {
            setRoleLoading(false);
        }
    };
    useEffect(() => {
        if (roleLoading) return;          
        if (userRole !== "ADMIN") {
            router.push("/dashboard");
        }
    }, [userRole, roleLoading]);


    const fetchNotes = async () => {
        const data = await getAllNotesAdmin();
        setNotes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
        getUserRole()
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;
        await deleteNotesAdmin(deleteId);
        setDeleteId(null);
        fetchNotes();
    };

    if (loading) return <p className="p-6">Loading admin dashboard…</p>;

    return (
        <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    Admin — All Notes
                </h1>

                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                </Button>
            </div>

            {/* Notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <Card
                        key={note.id}
                        className="p-4 space-y-2 relative"
                    >
                        <h2 className="font-medium truncate">
                            {note.title || "Untitled"}
                        </h2>

                        <p className="text-xs text-muted-foreground">
                            Owner: {note.owner?.email}
                        </p>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setDeleteId(note.id)}
                                >
                                    Delete
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Delete this note?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the note for all users.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setDeleteId(null)}>
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
                ))}
            </div>
        </div>
    );
}

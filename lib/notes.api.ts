import api from "./axios";

export const getMyNotes =async () => {
    const res = await api.get("/notes/")
    return res.data
}

export const createNotes = async (title: string, content: string) => {
    const res = await api.post("/notes/", { title, content });
    return res
}

export const getNoteById = async(id: string) => {
    const res = await api.get(`/notes/${id}`)
    return res.data
}

export const updateNote = async (id: string, title: string, content: string) => {
    const res = await api.put(`/notes/${id}`, {title, content});
    return res.data
}

export const deleteNote = async(noteId: string) => {
    await api.delete(`/notes/${noteId}`)
}

export const searchNotes = async (query: string) => {
  const res = await api.get(`/notes/search?q=${encodeURIComponent(query)}`);
  return res.data.notes;
};
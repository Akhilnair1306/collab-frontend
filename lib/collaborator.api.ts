import api from "./axios";

export const getCollaborators = async(noteId: string) => {
    const res = await api.get(`/notes/${noteId}/collaborator`)
    return res.data
}

export const addCollaborator = async(noteId: string, email:string, role: "VIEWER" | "EDITOR") => {
    const res = await api.post(`/notes/${noteId}/collaborator`, {email, role})
    return res.data
}

export const removeCollaborator = async (
  noteId: string,
  collaboratorId: string
) => {
  await api.delete(`/notes/${noteId}/collaborator/${collaboratorId}`);
};

export const searchCollaborators = async (
  noteId: string,
  email: string
) => {
  const res = await api.get(
    `/notes/${noteId}/collaborators/search?email=${encodeURIComponent(email)}`
  );
  return res.data.users;
};
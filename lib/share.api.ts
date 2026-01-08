import api from "./axios";

export const generateShareLink = async (noteId: string) => {
    const res = await api.post(`/notes/${noteId}/share`)
    return res.data.shareUrl
}

export const getSharedNote = async(token: string) => {
    const res = await api.get(`/notes/share/${token}`)
    return res.data.note
}
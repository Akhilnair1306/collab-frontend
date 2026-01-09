import api from "./axios"

export const getAllNotesAdmin = async() => {
    const res = await api.get("/admin")
    return res.data.notes
}

export const deleteNotesAdmin = async(noteId: string) => {
    await api.delete(`/admin/${noteId}`)
}

export const getRole = async() => {
    const res = await api.get(`/users/me`)
    return res.data.role
}
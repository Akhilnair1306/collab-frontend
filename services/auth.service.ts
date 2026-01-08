import api from "@/lib/axios";

export const signup = async(data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await api.post("/users/signup", data)
    return res.data
}

export const login = async(data: {
    email:string;
    password: string;
}) => {
    const res = await api.post("/users/login", data)
    return res.data
}
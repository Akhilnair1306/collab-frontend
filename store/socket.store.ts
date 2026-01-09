import { create } from "zustand";
import { io, Socket } from 'socket.io-client'

interface SocketStore {
    socket: Socket | null;
    connect: (token: string) => void;
    disconnect: () => void
}

export const useSocketStore = create<SocketStore>((set) => ({
    socket: null,

    connect: (token) => {
        console.log("SOCKET CONNECT CALLED");
        // const socket = io("http://localhost:5000", {
        const socket = io("https://collab-backend-738u.onrender.com", {
            auth: { token: localStorage.getItem("token") },
        });

        set({socket});
    },

    disconnect: () =>{
        set((state) => {
            state.socket?.disconnect();
            return {socket: null}
        })
    }
}))
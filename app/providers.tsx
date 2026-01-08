// app/providers.tsx
"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useSocketStore } from "@/store/socket.store";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {


  const { token, isInitialized, initAuth } = useAuthStore();
  const connectSocket = useSocketStore((s) => s.connect);

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (!token) return;

    console.log("🔌 Connecting socket with token");
    connectSocket(token);
  }, [isInitialized, token]);
  
  return <>{children}</>;
}

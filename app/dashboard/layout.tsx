// app/(dashboard)/layout.tsx
"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isInitialized } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;
    if (!token) router.push("/login");
  }, [token, isInitialized]);

  if (!isInitialized) return null;

  return <>{children}</>;
}

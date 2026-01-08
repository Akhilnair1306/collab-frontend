"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useSocketStore } from "@/store/socket.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const connectSocket = useSocketStore((s) => s.connect)
  const router = useRouter();

  const handleLogin = async () => {
    const data = await login({ email, password });
    setToken(data.token);
    // console.log(data)
    connectSocket(data.token)
    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="p-6 w-96 space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>
        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
        <p className="text-sm text-center text-muted-foreground">
                    Do not have an account?{" "}
                    <Link href="/signup" className="text-primary underline">
                        Sign Up
                    </Link>
                </p>
      </Card>
    </div>
  );
}
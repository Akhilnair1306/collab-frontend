"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signup } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useSocketStore } from "@/store/socket.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const setToken = useAuthStore((s) => s.setToken)

    const connectSocket = useSocketStore((s) => s.connect)
    const router = useRouter()

    const handleSignUp = async () => {
        const data = await signup({ name, email, password });
        setToken(data.token)
        connectSocket(data.token)
        router.push("/dashboard")
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="p-6 w-96 space-y-4">
                <h1 className="text-xl font-semibold"> Sign Up</h1>
                <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
                <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <Button className="w-full" onClick={handleSignUp}> Sign Up</Button>
                <p className="text-sm text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary underline">
                        Login
                    </Link>
                </p>
            </Card>

        </div>
    )
}
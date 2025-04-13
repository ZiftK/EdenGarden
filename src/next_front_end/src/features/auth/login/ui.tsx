'use client'

import { useEffect } from "react"
import { useAuthStore } from "../model/useAuthStore"
import { useRouter } from "next/navigation"
import Input from "@/src/components/ERP/atoms/input"

export function LoginForm() {
    const {login, loading, error, user} = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if(user){
            router.push("/dashboard")
        }
    },[user])

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const exp = formData.get("id") as string
        const pass = formData.get("password") as string
        await login(exp, pass)
    }

    return (
        <form 
            action="signup" 
            className="max-w-screen " 
            onSubmit={handleLogin} 
            >
                <Input
                    label="Expediente"
                    name="id"
                    type="text"
                    required
                    placeholder="Ej: 12345678"
                    className="mb-4"
                />
                <Input
                    label="Contraseña"
                    name="password"
                    type="password"
                    required
                    placeholder="Ej: 12345678"
                    className="mb-4"
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Acceder"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}
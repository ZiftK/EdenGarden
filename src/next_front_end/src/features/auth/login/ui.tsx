'use client'

import { useEffect } from "react"
import { useAuthStore } from "../model/useAuthStore"
import { useRouter } from "next/navigation"

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
        const exp = formData.get("expedient") as string
        const pass = formData.get("password") as string
        await login(exp, pass)
    }

    return (
        <form 
            action="signup" 
            className="max-w-screen " 
            onSubmit={handleLogin} 
            >
                <div>
                    <label htmlFor="expedient">Expediente</label>
                    <input                         
                        type="text"                 
                        id="expedient" 
                        name="expedient" 
                        required
                        />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input                         
                        type="password"                 
                        id="password" 
                        name="password" 
                        required
                        />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Cargando..." : "Acceder"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
        </form>
    )
}
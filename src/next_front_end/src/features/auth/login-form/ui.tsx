'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "../model/authStore"

export function LoginForm() {
    const [expedient, setExpedient] = useState("")
    const [password, setPassword] = useState("")
    const {login, loading, error} = useAuthStore()
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try{
            await login(expedient, password)
            router.push("/dashboard")
        } catch(err){
            console.error("Error logging in:", err)
        }
    }

    return (
        <form action="signup" className="max-w-screen " onSubmit={handleSubmit} >
            <div>
                <label htmlFor="expedient">Expediente</label>
                <input onChange={(e) => setExpedient(e.target.value)} type="text" id="expedient" name="expedient" required />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" required />
            </div>
            <button type="submit">Acceder</button>
        </form>
    )
}
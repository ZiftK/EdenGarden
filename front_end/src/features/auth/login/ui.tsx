'use client'

import React, { useEffect } from "react"
import { useAuthStore } from "../model/useAuthStore"
import { useRouter } from "next/navigation"
import {  Input } from "@raul_yael/cleangui"
import { BtnOutlined } from "@/src/shared/components/atoms/Button"

export function LoginForm() {
    const {login, loading, error, user} = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if(user){
            router.push("/dashboard")
        }
    },[user])

    const handleLogin = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget.closest("form") as HTMLFormElement)
        const exp = formData.get("id") as string
        const pass = formData.get("password") as string
        console.log(exp, pass)
        await login(exp, pass)
    }

    return (
        <form 
            action="login" 
            className="w-60 flex flex-col h-full justify-between self-end" 
            >
                <div>

                <Input
                    $variant="filled"
                    label="Expediente"
                    className="mb-4 bg-transparent"
                    $bg="#00000000"
                    $width="100%"
                    $colorNoFocus="#00000000"
                    color="#ccc"
                    $lightnessFactor={50}
                    name="id"
                    />
                <Input
                    $variant="filled"
                    $bg="#00000000"
                    $colorNoFocus="#00000000"
                    color="#ccc"
                    $width="100%"
                    $lightnessFactor={100}
                    label="Contraseña"
                    className="mb-4"
                    name="password"
                    />
                {error && <p className="text-red-500 w-fit text-xs self-end">{error}</p>}
                </div>

                <BtnOutlined text={loading ? "Cargando..." : "Acceder"} 
                    onClick={handleLogin}
                    style={{fontSize: 'var(--font-xs)', outline: '.7px solid var(--"var(--green-dark-transparent-100))'}}
                    className="self-end "
                    > 
                </BtnOutlined>
        </form>
    )
}
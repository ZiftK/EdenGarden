'use client'

import { SessionProvider, useSession } from "next-auth/react"

export default function LoginERP(){
    const { data: session, status} = useSession()

    if(status === "authenticated") return 

    return (
        <SessionProvider session={}>
        <form action="signup" >
            <div>
                <label htmlFor="username">Expediente</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Acceder</button>
        </form>
        </SessionProvider>
    )
}
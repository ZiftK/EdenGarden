'use client'

import { useAuthStore } from "@/src/features/auth/model/useAuthStore"
import { useHydrate } from "@/src/shared/lib/auth/zustand-hydration"

import { User } from "@/src/shared/types"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: User}
}){
    const {validateSession} = useAuthStore()
    useHydrate(useAuthStore, dehydratedState)
    validateSession()

    return (
        <div className="flex flex-col gap-4">
            <h1>Dashboard</h1>
            <p>Bienvenido al dashboard</p>
        </div>
    )
}
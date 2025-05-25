import { cookies } from "next/headers";
import { Employee } from "../../types"

export async function getServerUser(): Promise<Employee | null> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
            headers: {
                Cookie: cookies().toString(),
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            cache: 'no-store',
        })

        if (!response.ok) {
            return null
        }

        const user = await response.json()
        return user
    } catch {
        return null
    }
}
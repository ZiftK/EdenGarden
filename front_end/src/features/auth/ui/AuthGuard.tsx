'use client'

import { useAuthStore } from '../model/useAuthStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
	children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
	const { user, validateSession } = useAuthStore()
	const router = useRouter()

	useEffect(() => {
		const checkAuth = async () => {
			await validateSession()
			if (!user) {
				router.replace('/login')
			}
		}

		checkAuth()
	}, [])

	// Show nothing while checking authentication
	if (!user) {
		return null
	}

	return <>{children}</>
}

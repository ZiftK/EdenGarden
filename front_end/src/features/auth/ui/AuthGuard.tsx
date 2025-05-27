'use client'

import { useAuthStore } from '../model/useAuthStore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
	children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
	const { user, validateSession } = useAuthStore()
	const router = useRouter()
	const [isValidating, setIsValidating] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			await validateSession()
			setIsValidating(false)
		}

		checkAuth()
	}, [validateSession])

	useEffect(() => {
		if (!isValidating && !user) {
			router.replace('/login')
		}
	}, [user, isValidating, router])

	// Mostrar nada mientras validamos
	if (isValidating) {
		return null
	}

	// Si no hay usuario después de validar, no mostrar nada (estaremos redirigiendo)
	if (!user) {
		return null
	}

	return <>{children}</>
}

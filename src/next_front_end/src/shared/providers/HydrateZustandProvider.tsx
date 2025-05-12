'use client'

import { useEffect } from 'react'
import { useHydrate } from '@/src/shared/lib/auth/zustand-hydration'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { Employee } from '@/src/shared/types'

interface Props {
	children: React.ReactNode
	user: Employee
}

export default function HydrateZustandProvider({ children, user }: Props) {
	useHydrate(useAuthStore, { user })

	useEffect(() => {
		useAuthStore.getState().validateSession()
	}, [])

	return <>{children}</>
}

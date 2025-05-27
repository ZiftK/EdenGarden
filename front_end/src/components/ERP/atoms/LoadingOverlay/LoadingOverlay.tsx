'use client'

import { useLoadingStore } from '@/src/store/loadingStore'
import { Spinner } from '@heroui/react'
import { useEffect } from 'react'

export default function LoadingOverlay() {
	const { isLoading, loadingMessage, resetLoading } = useLoadingStore()

	// Limpiar el estado de loading cuando el componente se desmonta
	useEffect(() => {
		return () => {
			resetLoading()
		}
	}, [resetLoading])

	// Escuchar los headers de respuesta para el estado de loading
	useEffect(() => {
		const handleLoadingHeaders = (response: Response) => {
			const loadingState = response.headers.get('X-Loading-State')
			if (loadingState === 'true') {
				// El backend indica que está procesando
				useLoadingStore
					.getState()
					.setLoading(true, 'Processing request...')
			}
		}

		// Interceptar las respuestas de fetch
		const originalFetch = window.fetch
		window.fetch = async (...args) => {
			const response = await originalFetch(...args)
			handleLoadingHeaders(response)
			return response
		}

		return () => {
			// Restaurar el fetch original cuando el componente se desmonte
			window.fetch = originalFetch
		}
	}, [])

	if (!isLoading) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
			<div className='bg-[var(--bg-card-obscure)] p-6 rounded-lg shadow-lg flex flex-col items-center gap-4'>
				<Spinner size='lg' className='text-[var(--green-dark-500)]' />
				{loadingMessage && (
					<p className='text-[var(--father-font)] text-sm'>
						{loadingMessage}
					</p>
				)}
			</div>
		</div>
	)
}

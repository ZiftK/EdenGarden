'use client'

import { useEffect } from 'react'
import { Box, Typography } from '@raul_yael/cleangui'
import { useContactStore } from '@/src/features/Contact/model/contactStore'
import { EmailIcon } from '@/src/components/landing/atoms/Icons/Icons'
import { UserIcon, TrashIcon } from '@/src/components/ERP/moleculs/icons/iconst'
import Title from '@/src/shared/components/atoms/Title'

export default function MessagesPage() {
	const { messages, loading, getMessages, markAsRead, updateStatus } =
		useContactStore()

	useEffect(() => {
		getMessages()
	}, [getMessages])

	const handleMarkAsRead = async (id: string) => {
		await markAsRead(id)
	}

	const handleUpdateStatus = async (id: string, status: 'prospecto') => {
		await updateStatus(id, status)
	}

	const handleDelete = async (id: string) => {
		await updateStatus(id, 'eliminado')
	}

	const handleEmailClick = (email: string) => {
		window.open(
			`mailto:${email}?subject=Re: Mensaje recibido&body=En respuesta a: mensaje recibido%0D%0A%0D%0A`
		)
	}

	if (loading) {
		return (
			<Title
				title='Mensajes Nuevos'
				btn={{ active: false, path: '/dashboard/equipos/crear' }}
			/>
		)
	}

	return (
		<Box className='p-6 md:row-start-2 md:row-end-4 xl:col-start-2'>
			<Title
				title='Mensajes Nuevos'
				btn={{ active: false, path: '/dashboard/equipos/crear' }}
			/>

			<div className='grid gap-4'>
				{messages.map((message) => (
					<Box
						key={message.id}
						className={`p-4 ${message.read ? 'bg-opacity-50' : 'bg-opacity-80'}`}
					>
						<div className='flex justify-between items-start mb-4'>
							<div>
								<Typography className='font-bold'>
									{message.name}
								</Typography>
								<Typography
									className='text-blue-500 cursor-pointer hover:underline flex items-center gap-2'
									onClick={() =>
										handleEmailClick(message.email)
									}
								>
									<EmailIcon
										h={16}
										color='var(--green-dark-500)'
									/>
									{message.email}
								</Typography>
								<Typography>{message.phone}</Typography>
								<Typography className='mt-2 text-gray-600'>
									{message.message}
								</Typography>
							</div>
							<div className='flex gap-2'>
								{!message.read && (
									<button
										onClick={() =>
											handleMarkAsRead(message.id)
										}
										className='p-2 text-gray-600 hover:text-gray-800'
										title='Marcar como leído'
									>
										<EmailIcon
											h={20}
											color='var(--father-font)'
										/>
									</button>
								)}
								<button
									onClick={() =>
										handleUpdateStatus(
											message.id,
											'prospecto'
										)
									}
									className={`p-2 ${message.status === 'prospecto' ? 'text-[var(--green-dark-500)]' : 'text-gray-600 hover:text-[var(--green-dark-500)]'}`}
									title='Marcar como prospecto'
								>
									<UserIcon
										h={20}
										color={
											message.status === 'prospecto'
												? 'var(--green-dark-500)'
												: 'var(--father-font)'
										}
									/>
								</button>
								<button
									onClick={() => handleDelete(message.id)}
									className='p-2 text-gray-600 hover:text-red-600'
									title='Eliminar'
								>
									<TrashIcon
										h={20}
										color='var(--father-font)'
									/>
								</button>
							</div>
						</div>
						<div className='mt-2'>
							<span
								className={`px-2 py-1 rounded text-sm ${
									message.status === 'nuevo'
										? 'bg-blue-100 text-blue-800'
										: message.status === 'prospecto'
											? 'bg-green-100 text-green-800'
											: 'bg-gray-100 text-gray-800'
								}`}
							>
								{message.status.charAt(0).toUpperCase() +
									message.status.slice(1)}
							</span>
						</div>
					</Box>
				))}

				{messages.length === 0 && (
					<Box className='p-0'>
						<p className='text-[var(--father-font)]'>
							No hay mensajes para mostrar
						</p>
					</Box>
				)}
			</div>
		</Box>
	)
}

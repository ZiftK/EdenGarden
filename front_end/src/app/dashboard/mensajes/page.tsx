'use client'

import { useEffect } from 'react'
import { Typography } from '@raul_yael/cleangui'
import { useContactStore } from '@/src/features/Contact/model/contactStore'
import { EmailIcon } from '@/src/components/landing/atoms/Icons/Icons'
import {
	UserIcon,
	TrashIcon,
	MarkAsReadIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import Title from '@/src/shared/components/atoms/Title'
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react'

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
		<div className='p-6 md:row-start-2 md:row-end-4 xl:col-start-2 text-[var(--father-font)]'>
			<Title
				title='Mensajes Nuevos'
				btn={{ active: false, path: '/dashboard/equipos/crear' }}
			/>

			<div className='grid gap-4'>
				{messages.map((message) => (
					<Card
						key={message.id}
						className={`bg-[var(--bg-card-obscure)] ${message.read ? 'opacity-70' : ''}`}
					>
						<CardHeader className='pb-2'>
							<div className='w-full flex justify-between items-center'>
								<div>
									<Typography className='font-bold text-lg'>
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
								</div>
								<div className='flex gap-2 ml-auto'>
									{!message.read && (
										<Button
											onPress={() =>
												handleMarkAsRead(message.id)
											}
											className='p-2 text-gray-600 hover:text-gray-800'
											title='Marcar como leído'
											variant='ghost'
											size='sm'
										>
											<MarkAsReadIcon
												h={20}
												color='var(--father-font)'
											/>
										</Button>
									)}
									<Button
										onPress={() =>
											handleUpdateStatus(
												message.id,
												'prospecto'
											)
										}
										className={`p-2 ${message.status === 'prospecto' ? 'text-[var(--green-dark-500)]' : 'text-gray-600 hover:text-[var(--green-dark-500)]'}`}
										title='Marcar como prospecto'
										variant='ghost'
										size='sm'
									>
										<UserIcon
											h={20}
											color={
												message.status === 'prospecto'
													? 'var(--green-dark-500)'
													: 'var(--father-font)'
											}
										/>
									</Button>
									<Button
										onPress={() => handleDelete(message.id)}
										className='p-2 text-gray-600 hover:text-red-600'
										title='Eliminar'
										variant='ghost'
										size='sm'
									>
										<TrashIcon
											h={20}
											color='var(--father-font)'
										/>
									</Button>
								</div>
							</div>
						</CardHeader>
						<Divider />
						<CardBody className='pt-4'>
							<Typography className='text-sm text-gray-600 mb-2'>
								{message.phone}
							</Typography>
							<Typography className='text-sm text-gray-700 whitespace-pre-wrap'>
								{message.message}
							</Typography>
							<div className='mt-4'>
								<span
									className={`px-2 py-1 rounded text-xs font-medium ${
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
						</CardBody>
					</Card>
				))}

				{messages.length === 0 && (
					<Card className='p-6 text-center'>
						<Typography className='text-[var(--father-font)]'>
							No hay mensajes para mostrar
						</Typography>
					</Card>
				)}
			</div>
		</div>
	)
}

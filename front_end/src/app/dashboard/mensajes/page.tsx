'use client'

import { useEffect, useState } from 'react'
import { useContactStore } from '@/src/features/Contact/model/contactStore'
import {
	UserIcon,
	TrashIcon,
	MarkAsReadIcon,
	ClientIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import Title from '@/src/shared/components/atoms/Title'
import { Card, CardBody, CardHeader, Button, Divider } from '@heroui/react'
import Loading from './loading'

export default function MessagesPage() {
	const { messages, loading, getMessages, markAsRead, updateStatus } =
		useContactStore()
	const [loadingStates, setLoadingStates] = useState<{
		[key: string]: boolean
	}>({})

	useEffect(() => {
		getMessages()
	}, [getMessages])

	const handleMarkAsRead = async (id: string) => {
		await markAsRead(id)
	}

	const handleUpdateStatus = async (
		id: string,
		newStatus: 'prospecto' | 'cliente'
	) => {
		try {
			setLoadingStates((prev) => ({ ...prev, [id]: true }))
			await updateStatus(id, newStatus)
		} finally {
			setLoadingStates((prev) => ({ ...prev, [id]: false }))
		}
	}

	const handleDelete = async (id: string) => {
		try {
			setLoadingStates((prev) => ({ ...prev, [id]: true }))
			await updateStatus(id, 'eliminado')
		} finally {
			setLoadingStates((prev) => ({ ...prev, [id]: false }))
		}
	}

	const handleEmailClick = (email: string) => {
		window.open(
			`mailto:${email}?subject=Re: Mensaje recibido&body=En respuesta a: mensaje recibido%0D%0A%0D%0A`
		)
	}

	if (loading) {
		return <Loading />
	}

	return (
		<div className='p-6 md:row-start-2 md:row-end-4 xl:col-start-2 text-[var(--father-font)]'>
			<Title
				title='Mensajes Nuevos'
				btn={{ active: false, path: '/dashboard/equipos/crear' }}
			/>

			{messages.length === 0 ? (
				<Card className='p-6 text-center'>
					<p className='text-[var(--father-font)]'>
						No hay mensajes para mostrar
					</p>
				</Card>
			) : (
				messages.map((message) => (
					<Card
						key={message.id}
						className={`bg-[var(--bg-card-obscure)] mb-4 ${message.read ? 'opacity-70' : ''}`}
					>
						<CardHeader className='pb-2'>
							<div className='w-full flex justify-between items-center'>
								<div>
									<p className='font-bold text-lg'>
										{message.name}
									</p>
									<div
										className='text-blue-300 cursor-pointer hover:underline flex items-center gap-2'
										onClick={() =>
											handleEmailClick(message.email)
										}
									>
										<p>{message.email}</p>
									</div>
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
										className={`p-2 ${message.status === 'prospecto' ? 'text-[var(--green-dark-500)]' : ' hover:text-[var(--green-dark-500)]'}`}
										title='Marcar como prospecto'
										variant='ghost'
										size='sm'
										isDisabled={
											loadingStates[message.id] ||
											message.status === 'cliente'
										}
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
										onPress={() =>
											handleUpdateStatus(
												message.id,
												'cliente'
											)
										}
										className={`p-2 ${message.status === 'cliente' ? 'text-[var(--blue-dark-500)]' : ' hover:text-[var(--blue-dark-500)]'}`}
										title='Marcar como cliente'
										variant='ghost'
										size='sm'
										isDisabled={
											loadingStates[message.id] ||
											message.status === 'eliminado'
										}
									>
										<ClientIcon
											h={20}
											color={
												message.status === 'cliente'
													? '#00aaff'
													: 'var(--father-font)'
											}
										/>
									</Button>
									<Button
										onPress={() => handleDelete(message.id)}
										className='p-2  hover:text-red-600'
										title='Eliminar'
										variant='ghost'
										size='sm'
										isDisabled={loadingStates[message.id]}
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
							<p className='text-sm  mb-2'>
								<b>Número de teléfono:</b> {message.phone}
							</p>
							<p className='text-sm  whitespace-pre-wrap'>
								<b>Mensaje:</b> {message.message}
							</p>
							<div className='mt-4'>
								<span
									className={`px-2 py-1 rounded text-sm font-medium ${
										message.status === 'nuevo'
											? 'bg-blue-100 text-blue-800'
											: message.status === 'prospecto'
												? 'bg-green-100 text-green-800'
												: message.status === 'cliente'
													? 'bg-blue-500 text-white'
													: 'bg-gray-100 text-gray-800'
									}`}
								>
									{message.status.charAt(0).toUpperCase() +
										message.status.slice(1)}
								</span>
							</div>
						</CardBody>
					</Card>
				))
			)}
		</div>
	)
}

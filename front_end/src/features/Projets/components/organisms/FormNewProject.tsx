'use client'

import { ShortTeam } from '@/src/shared/types'
import {
	Input,
	Button,
	Select,
	SelectItem,
	Textarea,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Divider,
} from '@heroui/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ProjectSendToAPI } from '../../types'
import { ClientToCreate } from '../../types/client'
import { ProjectCalendarToCreate } from '../../types/calendario'
import { isClientComplete } from '../../model/client.utils'
import { getTeams } from '@/src/features/Teams/api/getTeams'
import { createNewProject } from '../../model/project.service'
import {
	parseDateStringToCustomDate,
	customDateToDateString,
} from '@/src/shared/hooks/useDatesCustoms'

export default function FormNewProject() {
	const [teams, setTeams] = useState<ShortTeam[]>([])
	const [newProject, setNewProject] = useState<
		ProjectSendToAPI<
			Partial<ClientToCreate>,
			Partial<ProjectCalendarToCreate>
		>
	>({
		id_proyecto: 0,
		cliente: {},
		calendario: {},
		equipo: {} as ShortTeam,
		nombre: '',
		estado: '',
		costo: 0,
		img: '',
	})

	useEffect(() => {
		const fetchTeams = async () => {
			const teams = await getTeams()
			setTeams(teams)
		}

		fetchTeams()
	}, [])

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const dateValue = value ? parseDateStringToCustomDate(value) : null

		if (name.includes('.')) {
			const [parent, child] = name.split('.')
			setNewProject((prev) => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: dateValue,
				},
			}))
		} else {
			setNewProject((prev) => ({
				...prev,
				[name]: dateValue,
			}))
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (name.includes('.')) {
			const [parent, child] = name.split('.')
			setNewProject((prev) => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: value,
				},
			}))
		} else {
			setNewProject((prev) => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleTeamChange = (teamId: string) => {
		const selectedTeam = teams.find((team) => team.nombre === teamId)
		if (selectedTeam) {
			setNewProject((prev) => ({
				...prev,
				equipo: selectedTeam,
			}))
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setNewProject((prev) => ({
					...prev,
					img: reader.result as string,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async () => {
		try {
			// Validar cliente
			if (!isClientComplete(newProject.cliente!)) {
				throw new Error(
					'Por favor complete todos los campos del cliente'
				)
			}

			// Preparar datos para el servicio
			const projectData = {
				client: {
					nombre: newProject.cliente!.nombre!,
					direccion: newProject.cliente!.direccion!,
					telefono: newProject.cliente!.telefono!,
					email: newProject.cliente!.email!,
				},
				project: {
					nombre: newProject.nombre,
					descripcion: newProject.descripcion,
					estado: newProject.estado,
					costo: newProject.costo,
					equipo: Number(newProject.equipo?.id_equipo),
				},
				calendar:
					newProject.calendario.fecha_inicio &&
					newProject.calendario.fecha_fin
						? newProject.calendario
						: undefined,
				image: newProject.img?.startsWith('data:image/')
					? newProject.img
					: undefined,
			}

			// Crear proyecto usando el servicio
			const projectId = await createNewProject(projectData)

			// Redirigir al detalle del proyecto
			if (projectId) {
				redirect(`/dashboard/proyectos/${projectId}`)
			}
		} catch (error: unknown) {
			console.error('Error creating project:', error)
			if (error instanceof Error) {
				if ('response' in error) {
					const apiError = error as {
						response: { status: number; data: any; headers: any }
					}
					console.error('Error response:', {
						status: apiError.response.status,
						data: apiError.response.data,
						headers: apiError.response.headers,
					})
				} else if ('request' in error) {
					const requestError = error as { request: any }
					console.error('Error request:', requestError.request)
				} else {
					console.error('Error message:', error.message)
				}
			}
			throw error
		}
	}

	const classNames = {
		input: {
			label: '!text-white/50',
			input: 'label:!text-[var(--father-font)] bg-transparent !text-[var(--father-font)] focus:!bg-white/30 active:!bg-white/30',
			inputWrapper: [
				'!bg-transparent',
				'hover:!bg-white/30',
				'!data-[focused=true]:bg-transparent',
				'data-[hover=true]:!bg-white/30',
				'focus-within:!bg-transparent',
				'focus:!bg-transparent',
				'active:!bg-transparent',
				'focus:border-white/50',
			],
		},
		select: {
			label: '!text-white/50',
			value: '!text-[var(--father-font)]',
			trigger: [
				'bg-transparent',
				'!text-[var(--father-font)]',
				'focus:!bg-white/30',
				'active:!bg-white/30',
				'hover:!bg-white/30',
				'data-[hover=true]:!bg-white/30',
				'error:!bg-green-500',
			],
			listbox: 'bg-[#222] !text-[var(--father-font)]',
			popoverContent: 'bg-[#222] border-[#333]',
		},
	}

	return (
		<Card className='!relative z-0 max-w-3xl mx-auto bg-[var(--bg-card-obscure)] overflow-hidden'>
			<CardHeader className='flex gap-3'>
				<div className='flex flex-col'>
					<p className='text-xl font-bold text-[var(--father-font)]'>
						Registrar Nuevo Proyecto
					</p>
					<p className='text-small text-[var(--children-font)]'>
						Complete todos los campos requeridos
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='space-y-4'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Información del Proyecto */}
						<div className='space-y-2'>
							<h3 className='text-lg font-medium text-[var(--father-font)]'>
								Información del Proyecto
							</h3>

							<Input
								label='Nombre del Proyecto'
								name='nombre'
								value={newProject.nombre!}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Costo'
								name='costo'
								value={String(newProject.costo)}
								onChange={handleChange}
								placeholder='$0.00'
								isRequired
								classNames={classNames.input}
							/>

							<Select
								label='Equipo Asignado'
								onChange={(e) =>
									handleTeamChange(e.target.value)
								}
								className='w-full'
								classNames={classNames.select}
								value={newProject.equipo?.nombre}
							>
								{teams.map((team) => (
									<SelectItem key={team.id_equipo}>
										{team.nombre} (
										{`${team.empleados.length} miembros`})
									</SelectItem>
								))}
							</Select>
						</div>

						{/* Información del Cliente */}
						<div className='space-y-2'>
							<h3 className='text-lg font-medium text-[var(--father-font)]'>
								Información del Cliente
							</h3>

							<Input
								label='Nombre del Cliente'
								name='cliente.nombre'
								value={newProject.cliente!.nombre}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Correo Electrónico'
								name='cliente.email'
								type='email'
								value={newProject.cliente!.email}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Teléfono'
								name='cliente.telefono'
								value={newProject.cliente!.telefono}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Textarea
								label='Dirección del Proyecto'
								name='cliente.direccion'
								value={newProject.cliente!.direccion}
								onChange={handleChange}
								minRows={2}
								maxRows={3}
								isRequired
								classNames={classNames.input}
							/>
						</div>
					</div>

					{/* Calendario del Proyecto */}
					<div className='space-y-2 mt-4'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Calendario del Proyecto
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								name='calendario.fecha_inicio'
								type='date'
								label='Fecha de Inicio'
								value={
									newProject.calendario.fecha_inicio
										? customDateToDateString(
												newProject.calendario
													.fecha_inicio
											)
										: ''
								}
								onChange={(e) => handleDateChange(e)}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								name='calendario.fecha_fin'
								label='Fecha de Finalización'
								type='date'
								value={
									newProject.calendario.fecha_fin
										? customDateToDateString(
												newProject.calendario.fecha_fin
											)
										: ''
								}
								onChange={(e) => handleDateChange(e)}
								isRequired
								classNames={classNames.input}
							/>
						</div>
					</div>

					{/* Sección de Imagen */}
					<div className='mt-4'>
						<h3 className='text-lg font-medium mb-2 text-[var(--father-font)]'>
							Imagen del Proyecto
						</h3>
						<div className='flex items-center gap-4'>
							{newProject.img && (
								<div className='relative w-32 h-24 rounded overflow-hidden'>
									<Image
										width={100}
										height={100}
										src={newProject.img}
										alt='Vista previa'
										className='w-full h-full object-cover'
									/>
								</div>
							)}
							<Input
								type='file'
								accept='image/*'
								onChange={handleImageChange}
								label='Seleccionar imagen'
								classNames={classNames.input}
								name='img'
							/>
						</div>
					</div>
				</div>
			</CardBody>

			<Divider />

			<CardFooter className='flex justify-start flex-row-reverse gap-2'>
				<Button
					className='bg-[var(--green-dark-500)] text-white text-sm px-3 py-2'
					size='sm'
					onPress={handleSubmit}
				>
					Crear nuevo proyecto
				</Button>

				<Link
					className='bg-gray-600 text-white text-sm py-1.5 px-3 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors'
					href={'/dashboard/proyectos'}
				>
					Cancelar
				</Link>
			</CardFooter>
		</Card>
	)
}

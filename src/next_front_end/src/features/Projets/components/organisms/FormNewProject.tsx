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
	DatePicker,
} from '@heroui/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Project } from '../../model/types'

export default function FormNewProject() {
	const [teams, setTeams] = useState<ShortTeam[]>([])
	const [newProject, setNewProject] = useState<Project>({
		id: '',
		name: '',
		teams: {} as ShortTeam,
		calendar: {
			intial_date: undefined,
			final_date: undefined,
		},
		image: undefined,
		price: '',
		clientData: {
			name: '',
			addressProject: '',
			phone: '',
			email: '',
		},
	})

	useEffect(() => {
		const fetchTeams = async () => {
			// Ejemplo de datos, reemplazar con tu lógica real
			const mockTeams: ShortTeam[] = [
				{ id: 'team1', name: 'Equipo Alpha', members: 5 },
				{ id: 'team2', name: 'Equipo Beta', members: 4 },
				{ id: 'team3', name: 'Equipo Gamma', members: 6 },
			]
			setTeams(mockTeams)
		}

		fetchTeams()
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		if (name.includes('.')) {
			const [parent, child] = name.split('.')
			setNewProject((prev) => ({
				...prev,
				[parent]: {
					...prev[parent as keyof Project],
					[child]: value,
				},
			}))
		} else {
			setNewProject((prev) => ({
				...prev,
				[name]: value,
			}))
		}
		console.log(newProject)
	}

	const handleTeamChange = (teamId: string) => {
		const selectedTeam = teams.find((team) => team.id === teamId)
		if (selectedTeam) {
			setNewProject((prev) => ({
				...prev,
				teams: selectedTeam,
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
					image: reader.result as string,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = () => {
		// Aquí puedes manejar el envío del formulario
		redirect(`/dashboard/proyectos/${newProject.id}`)
	}

	const classNames = {
		input: {
			label: '!text-white/50',
			input: 'label:!text-[var(--father-font)] bg-transparent !text-[var(--father-font)] focus:!bg-white/30 active:!bg-white/30',
			inputWrapper: [
				'bg-transparent',
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
			value: '!text-[var(--father-font)] ',
			trigger: [
				'bg-transparent',
				'!text-[var(--father-font)]',
				'focus:!bg-white/30',
				'active:!bg-white/30',
				'hover:!bg-white/30',
				'data-[hover=true]:!bg-white/30',
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
								name='name'
								value={newProject.name!}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='ID del Proyecto'
								name='id'
								value={newProject.id}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Presupuesto'
								name='price'
								value={newProject.price}
								onChange={handleChange}
								placeholder='$0.00'
								isRequired
								classNames={classNames.input}
							/>

							<Select
								label='Equipo Asignado'
								selectedKeys={[newProject.teams?.id || '']}
								onChange={(e) =>
									handleTeamChange(e.target.value)
								}
								className='w-full'
								classNames={classNames.select}
							>
								{teams.map((team) => (
									<SelectItem
										key={team.id}
										textValue={team.name}
									>
										{team.name} (
										{`${team.members} miembros`})
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
								name='clientData.name'
								value={newProject.clientData.name}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Correo Electrónico'
								name='clientData.email'
								type='email'
								value={newProject.clientData.email}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Teléfono'
								name='clientData.phone'
								value={newProject.clientData.phone}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Textarea
								label='Dirección del Proyecto'
								name='clientData.addressProject'
								value={newProject.clientData.addressProject}
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
								type='date'
								label='Fecha de Inicio'
								value={newProject.calendar.intial_date?.toDateString()}
								onChange={(e) => handleChange(e)}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								type='date'
								label='Fecha de Finalización'
								value={newProject.calendar.final_date?.toDateString()}
								onChange={(e) => handleChange(e)}
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
							{newProject.image && (
								<div className='relative w-32 h-24 rounded overflow-hidden'>
									<Image
										src={newProject.image}
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

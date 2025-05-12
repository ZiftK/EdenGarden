'use client'

import { Employee, ShortTeam } from '@/src/shared/types'
import {
	Input,
	Button,
	Select,
	SelectItem,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Divider,
} from '@heroui/react'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function FormNewEmplooye() {
	const teams: ShortTeam[] = []
	const [newEmployee, setNewEmployee] = useState<Employee>({
		id: '',
		name: '',
		address: '',
		phone_number: '',
		email: '',
		hire_date: '',
		salary: 0,
		in_time: '',
		out_time: '',
		password: '',
		role: 'user',
		position: '',
		img: undefined,
		status: 'active',
		teams: undefined,
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewEmployee((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSelectChange = (name: string, value: unknown) => {
		setNewEmployee((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const render = new FileReader()
			render.onload = () => {
				setNewEmployee((prev) => ({
					...prev,
					img: render.result as string,
				}))
			}
		}
	}

	const handleSubmit = () => {
		// Aquí puedes manejar el envío del formulario
		redirect(`/dadashboard/empleados/${newEmployee.id}`)
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
						Registrar Nuevo Empleado
					</p>
					<p className='text-small text-[var(--children-font)]'>
						Complete todos los campos requeridos
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='space-y-4'>
					{/* Información Personal */}
					<div className='space-y-2'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Información Personal
						</h3>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								label='Nombre Completo'
								name='name'
								value={newEmployee.name}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Correo Electrónico'
								name='email'
								type='email'
								value={newEmployee.email}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Teléfono'
								name='phone_number'
								value={newEmployee.phone_number}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Dirección'
								name='address'
								value={newEmployee.address}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
						</div>
					</div>

					{/* Información Laboral */}
					<div className='space-y-2 mt-4'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Información Laboral
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								label='Posición'
								name='position'
								value={newEmployee.position}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Salario'
								name='salary'
								type='number'
								value={String(newEmployee.salary)}
								onChange={(e) => handleChange(e)}
								placeholder='$0.00'
								isRequired
								classNames={classNames.input}
							/>

							<Input
								type='date'
								label='Fecha de Contratación'
								name='hire_date'
								value={newEmployee.hire_date}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Select
								label='Equipo Asignado'
								selectedKeys={[newEmployee.teams!]}
								onChange={(e) =>
									handleSelectChange('teams', e.target.value)
								}
								className='w-full'
								classNames={classNames.select}
							>
								{teams.map((team) => (
									<SelectItem
										key={team.id}
										textValue={team.name}
									>
										{team.name}
									</SelectItem>
								))}
							</Select>
						</div>
					</div>

					{/* Horario de Trabajo */}
					<div className='space-y-2 mt-4'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Horario de Trabajo
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								type='time'
								label='Hora de Entrada'
								name='in_time'
								value={newEmployee.in_time}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								type='time'
								label='Hora de Salida'
								name='out_time'
								value={newEmployee.out_time}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
						</div>
					</div>

					{/* Información de Acceso */}
					<div className='space-y-2 mt-4'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Información de Acceso
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								label='Contraseña'
								name='password'
								type='password'
								value={newEmployee.password}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Select
								label='Rol'
								selectedKeys={[newEmployee.role]}
								onChange={(e) =>
									handleSelectChange('role', e.target.value)
								}
								className='w-full'
								classNames={classNames.select}
							>
								<SelectItem key='user' textValue='Usuario'>
									Usuario
								</SelectItem>
								<SelectItem key='leader' textValue='Líder'>
									Líder
								</SelectItem>
								<SelectItem
									key='admin'
									textValue='Administrador'
								>
									Administrador
								</SelectItem>
							</Select>
						</div>
					</div>

					{/* Estado */}
					<div className='space-y-2 mt-4'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Estado
						</h3>
						<Select
							label='Estado del Empleado'
							selectedKeys={[newEmployee.status!]}
							onChange={(e) =>
								handleSelectChange('status', e.target.value)
							}
							className='w-full md:w-1/2'
							classNames={classNames.select}
						>
							<SelectItem key='active' textValue='Activo'>
								Activo
							</SelectItem>
							<SelectItem key='inactive' textValue='Inactivo'>
								Inactivo
							</SelectItem>
							<SelectItem key='pending' textValue='Pendiente'>
								Pendiente
							</SelectItem>
						</Select>
					</div>

					{/* Sección de Imagen */}
					<div className='mt-4'>
						<h3 className='text-lg font-medium mb-2 text-[var(--father-font)]'>
							Foto del Empleado
						</h3>
						<div className='flex items-center gap-4'>
							{newEmployee.img && (
								<div className='relative w-32 h-32 rounded-full overflow-hidden'>
									<Image
										src={newEmployee.img}
										alt='Vista previa'
										layout='fill'
										objectFit='cover'
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
					Registrar Empleado
				</Button>

				<Link
					className='bg-gray-600 text-white text-sm py-1.5 px-3 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors'
					href={'/dashboard/empleados'}
				>
					Cancelar
				</Link>
			</CardFooter>
		</Card>
	)
}

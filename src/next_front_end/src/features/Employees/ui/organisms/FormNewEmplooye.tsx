'use client'

import { Employee } from '@/src/shared/types'
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
import { useState } from 'react'

export default function FormNewEmplooye() {
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
		console.log(newEmployee)
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

	return (
		<Card className='!relative z-0 max-w-3xl mx-auto bg-[var(--bg-card-obscure)]'>
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
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Información Personal */}
						<div className='space-y-2'>
							<h3 className='text-lg font-medium text-[var(--father-font)]'>
								Información Personal
							</h3>

							<Input
								label='Nombre Completo'
								name='name'
								value={newEmployee.name}
								onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>

							<Input
								label='Correo Electrónico'
								name='email'
								type='email'
								value={newEmployee.email}
								// onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>

							<Input
								label='Número de Teléfono'
								name='phone_number'
								value={newEmployee.phone_number}
								onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>

							<Textarea
								label='Dirección'
								name='address'
								value={newEmployee.address}
								onChange={handleChange}
								minRows={2}
								maxRows={3}
								isRequired
								classNames={{
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
								}}
							/>

							<Input
								label='Contraseña'
								name='password'
								type='password'
								value={newEmployee.password}
								onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>
						</div>

						{/* Información Laboral */}
						<div className='space-y-2'>
							<h3 className='text-lg font-medium text-[var(--father-font)]'>
								Información Laboral
							</h3>

							<Input
								label='ID de Empleado'
								name='id'
								value={newEmployee.id}
								onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>

							<Input
								label='Posición'
								name='position'
								value={newEmployee.position}
								onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>

							<Select
								label='Rol'
								selectedKeys={[newEmployee.role]}
								onChange={(e) =>
									setNewEmployee({
										...newEmployee,
										role: e.target.value as
											| 'user'
											| 'admin'
											| 'leader',
									})
								}
								classNames={{
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
									helperWrapper: '!bg-red-400',
									listbox:
										'bg-[#222] !text-[var(--father-font)]',
									popoverContent: 'bg-[#222] border-[#333]',
								}}
							>
								<SelectItem key='user' textValue='user'>
									Usuario
								</SelectItem>
								<SelectItem key='admin' textValue='admin'>
									Administrador
								</SelectItem>
								<SelectItem key='leader' textValue='leader'>
									Líder
								</SelectItem>
							</Select>

							<Input
								label='Salario'
								name='salary'
								type='number'
								value={newEmployee.salary.toString()}
								onChange={handleChange}
								isRequired
								classNames={{
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
								}}
							/>

							<Select
								label='Estado'
								selectedKeys={[newEmployee.status || 'active']}
								onChange={(e) =>
									setNewEmployee({
										...newEmployee,
										status: e.target.value as
											| 'active'
											| 'inactive'
											| 'pending',
									})
								}
								className='w-full'
								classNames={{
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
									helperWrapper: '!bg-red-400',
									listbox:
										'bg-[#222] !text-[var(--father-font)]',
									popoverContent: 'bg-[#222] border-[#333]',
								}}
							>
								<SelectItem key='active' textValue='active'>
									Activo
								</SelectItem>
								<SelectItem key='inactive' textValue='inactive'>
									Inactivo
								</SelectItem>
								<SelectItem key='pending' textValue='pending'>
									Pendiente
								</SelectItem>
							</Select>
						</div>
					</div>

					{/* Sección de Imagen */}
					<div className='mt-4'>
						<h3 className='text-lg font-medium mb-2 text-[var(--father-font)]'>
							Foto de Perfil
						</h3>
						<div className='flex items-center gap-4'>
							{newEmployee.img && (
								<div className='relative w-24 h-24 rounded-full overflow-hidden'>
									<Image
										src={newEmployee.img}
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
								classNames={{
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
								}}
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
					Crear nuevo equipo
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

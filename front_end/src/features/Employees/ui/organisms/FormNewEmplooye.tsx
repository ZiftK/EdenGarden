'use client'

import { Employee, ShortTeam, DateFormat } from '@/src/shared/types'
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
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useEmployeeStore } from '../../model/employeeStore'
import { parseDateStringToCustomDate } from '@/src/shared/hooks/useDatesCustoms'

type EmployeeToCreate = Omit<Employee, 'equipo'> & {
	equipo?: string | undefined
}

export default function FormNewEmplooye() {
	const router = useRouter()
	const { createEmployee, isLoading, error, setError } = useEmployeeStore()
	const [teams, setTeams] = useState<ShortTeam[]>([])
	const [newEmployee, setNewEmployee] = useState<EmployeeToCreate>({
		id_empleado: 0,
		nombre: '',
		direccion: '',
		telefono: '',
		email: '',
		fecha_contratacion: {
			dia: 0,
			mes: 1,
			anno: 0,
		},
		salario: 0,
		fecha_salida: {
			dia: 0,
			mes: 1,
			anno: 0,
		},
		fecha_recontratacion: {
			dia: 0,
			mes: 1,
			anno: 0,
		},
		clave: '',
		rol: 'user',
		puesto: '',
		img: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setNewEmployee((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const dateValue = value
			? parseDateStringToCustomDate(value)
			: {
					dia: 0,
					mes: 1,
					anno: 0,
				}

		setNewEmployee((prev) => ({
			...prev,
			[name]: dateValue,
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
			const reader = new FileReader()
			reader.onload = () => {
				setNewEmployee((prev) => ({
					...prev,
					img: reader.result as string,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	const validateEmployee = (employee: EmployeeToCreate): boolean => {
		if (!employee.nombre) {
			setError('El nombre es requerido')
			return false
		}
		if (!employee.email) {
			setError('El correo electrónico es requerido')
			return false
		}
		if (!employee.telefono) {
			setError('El teléfono es requerido')
			return false
		}
		if (!employee.direccion) {
			setError('La dirección es requerida')
			return false
		}
		if (!employee.puesto) {
			setError('La posición es requerida')
			return false
		}
		if (!employee.salario || employee.salario <= 0) {
			setError('El salario debe ser mayor a 0')
			return false
		}
		if (!employee.fecha_contratacion) {
			setError('La fecha de contratación es requerida')
			return false
		}
		if (!employee.clave) {
			setError('La contraseña es requerida')
			return false
		}
		return true
	}

	const handleSubmit = async () => {
		try {
			if (!validateEmployee(newEmployee)) {
				return
			}

			// Create a copy of the employee data without the equipo field
			const { equipo, ...employeeData } = newEmployee

			await createEmployee(employeeData)
			router.push('/dashboard/empleados')
		} catch (error) {
			console.error('Error al crear el empleado:', error)
			setError('Error al crear el empleado')
		}
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
				' data-[invalid=true]:!bg-red-500',
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
								name='nombre'
								value={newEmployee.nombre}
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
								name='telefono'
								value={newEmployee.telefono}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Dirección'
								name='direccion'
								value={newEmployee.direccion}
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
								name='puesto'
								value={newEmployee.puesto}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>

							<Input
								label='Salario'
								name='salario'
								type='number'
								value={String(newEmployee.salario)}
								onChange={handleChange}
								placeholder='$0.00'
								isRequired
								classNames={classNames.input}
							/>

							<Input
								type='date'
								label='Fecha de Contratación'
								name='fecha_contratacion'
								onChange={handleDateChange}
								isRequired
								classNames={classNames.input}
							/>

							<Select
								label='Rol'
								selectedKeys={[newEmployee.rol]}
								onChange={(e) =>
									handleSelectChange('rol', e.target.value)
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

					{/* Información de Acceso */}
					<div className='space-y-2 mt-4'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Información de Acceso
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								label='Contraseña'
								name='clave'
								type='password'
								value={newEmployee.clave}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
						</div>
					</div>

					{/* Sección de Imagen */}
					<div className='mt-4'>
						<h3 className='text-lg font-medium mb-2 text-[var(--father-font)]'>
							Imagen del Empleado
						</h3>
						<div className='flex items-center gap-4'>
							{newEmployee.img && (
								<div className='relative w-32 h-32 rounded-full overflow-hidden'>
									<Image
										src={newEmployee.img}
										alt='Vista previa'
										fill
										className='object-cover'
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

					{error && (
						<div className='text-red-500 mt-4 text-sm'>{error}</div>
					)}
				</div>
			</CardBody>

			<Divider />

			<CardFooter className='flex justify-start flex-row-reverse gap-2'>
				<Button
					className='bg-[var(--green-dark-500)] text-white text-sm px-3 py-2'
					size='sm'
					onPress={handleSubmit}
					isLoading={isLoading}
				>
					Crear nuevo empleado
				</Button>

				<Link
					className='bg-gray-600 text-white text-sm py-1.5 px-3 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors'
					href='/dashboard/empleados'
				>
					Cancelar
				</Link>
			</CardFooter>
		</Card>
	)
}

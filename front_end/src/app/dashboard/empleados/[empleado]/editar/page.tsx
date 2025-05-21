'use client'

import { useEffect, useState } from 'react'
import { Employee } from '@/src/shared/types'
import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import {
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Input,
	Button,
	Select,
	SelectItem,
	Divider,
} from '@heroui/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const classNames = {
	input: {
		base: '[&>div>input]:!text-[var(--father-font)] [&>div>label]:!text-[var(--father-font)]',
		label: 'text-[var(--father-font)]',
	},
	select: {
		base: '[&>div>button]:!text-[var(--father-font)] [&>div>label]:!text-[var(--father-font)]',
		label: 'text-[var(--father-font)]',
	},
}

export default function EditEmployeePage({
	params,
}: {
	params: { empleado: string }
}) {
	const [employee, setEmployee] = useState<Employee | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { getEmployeeById, updateEmployee } = useEmployeeStore()
	const router = useRouter()

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				setLoading(true)
				setError(null)
				const data = await getEmployeeById(params.empleado)
				setEmployee(data)
			} catch (error) {
				console.error('Error al obtener el empleado:', error)
				setError('Error al cargar el empleado')
			} finally {
				setLoading(false)
			}
		}
		fetchEmployee()
	}, [params.empleado, getEmployeeById])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setEmployee((prev) => {
			if (!prev) return null
			return {
				...prev,
				[name]: value,
			}
		})
	}

	const handleSelectChange = (name: string, value: unknown) => {
		setEmployee((prev) => {
			if (!prev) return null
			return {
				...prev,
				[name]: value,
			}
		})
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setEmployee((prev) => {
					if (!prev) return null
					return {
						...prev,
						img_url: reader.result as string,
					}
				})
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async () => {
		if (!employee) return
		try {
			await updateEmployee(employee.id_empleado, employee)
			router.push(`/dashboard/empleados/${employee.id_empleado}`)
			router.refresh()
		} catch (error) {
			console.error('Error al actualizar el empleado:', error)
			setError('Error al actualizar el empleado')
		}
	}

	if (loading) return <div>Cargando...</div>
	if (error) return <div className='text-red-500'>{error}</div>
	if (!employee) return <div>Empleado no encontrado</div>

	return (
		<Card className='!relative z-0 max-w-3xl mx-auto bg-[var(--bg-card-obscure)] overflow-hidden'>
			<CardHeader className='flex gap-3'>
				<div className='flex flex-col'>
					<p className='text-xl font-bold text-[var(--father-font)]'>
						Editar Empleado
					</p>
					<p className='text-small text-[var(--children-font)]'>
						Modifica los campos que desees actualizar
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
								value={employee.nombre}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
							<Input
								label='Correo Electrónico'
								name='email'
								type='email'
								value={employee.email}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
							<Input
								label='Teléfono'
								name='telefono'
								value={employee.telefono}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
							<Input
								label='Dirección'
								name='direccion'
								value={employee.direccion}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
						</div>
					</div>

					{/* Información Laboral */}
					<div className='space-y-2'>
						<h3 className='text-lg font-medium text-[var(--father-font)]'>
							Información Laboral
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<Input
								label='Puesto'
								name='puesto'
								value={employee.puesto}
								onChange={handleChange}
								isRequired
								classNames={classNames.input}
							/>
							<Input
								label='Salario'
								name='salario'
								type='number'
								value={String(employee.salario)}
								onChange={handleChange}
								placeholder='$0.00'
								isRequired
								classNames={classNames.input}
							/>
							<Select
								label='Rol'
								selectedKeys={[employee.rol]}
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

					{/* Sección de Imagen */}
					<div className='mt-4'>
						<h3 className='text-lg font-medium mb-2 text-[var(--father-font)]'>
							Foto del Empleado
						</h3>
						<div className='flex items-center gap-4'>
							{employee.img_url && (
								<div className='relative w-32 h-32 rounded-full overflow-hidden'>
									<Image
										src={employee.img_url}
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
				</div>
			</CardBody>

			<Divider />

			<CardFooter className='flex justify-start flex-row-reverse gap-2'>
				<Button
					className='bg-[var(--green-dark-500)] text-white text-sm px-3 py-2'
					size='sm'
					onPress={handleSubmit}
				>
					Guardar Cambios
				</Button>

				<Link
					className='bg-gray-600 text-white text-sm py-1.5 px-3 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors'
					href={`/dashboard/empleados/${employee.id_empleado}`}
				>
					Cancelar
				</Link>
			</CardFooter>
		</Card>
	)
}

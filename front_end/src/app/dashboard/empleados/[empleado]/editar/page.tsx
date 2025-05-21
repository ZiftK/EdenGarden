'use client'

import { useEffect, useState } from 'react'
import { Employee, DateFormat } from '@/src/shared/types'
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
import { employeeFormStyles } from '@/src/features/Employees/ui/styles/employeeForm'

export default function EditEmployeePage({
	params,
}: {
	params: { empleado: string }
}) {
	const {
		currentEmployee,
		isLoading,
		error,
		getEmployeeById,
		updateEmployee,
		setError,
		clearCurrentEmployee,
	} = useEmployeeStore()
	const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null)
	const router = useRouter()

	useEffect(() => {
		getEmployeeById(params.empleado)
		return () => {
			clearCurrentEmployee()
		}
	}, [params.empleado, getEmployeeById, clearCurrentEmployee])

	useEffect(() => {
		if (currentEmployee) {
			setEditedEmployee(currentEmployee)
		}
	}, [currentEmployee])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editedEmployee) return
		const { name, value } = e.target
		setEditedEmployee({
			...editedEmployee,
			[name]: value,
		})
	}

	const handleSelectChange = (name: string, value: unknown) => {
		if (!editedEmployee) return
		setEditedEmployee({
			...editedEmployee,
			[name]: value,
		})
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editedEmployee) return
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setEditedEmployee({
					...editedEmployee,
					img: reader.result as string,
				})
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async () => {
		if (!editedEmployee) return
		try {
			await updateEmployee(editedEmployee.id_empleado, editedEmployee)
			router.push(`/dashboard/empleados/${editedEmployee.id_empleado}`)
			router.refresh()
		} catch (error) {
			setError('Error al actualizar el empleado')
		}
	}

	if (isLoading) return <div>Cargando...</div>
	if (error) return <div className='text-red-500'>{error}</div>
	if (!editedEmployee) return <div>Empleado no encontrado</div>

	return (
		<Card className={employeeFormStyles.container}>
			<CardHeader className='flex gap-3'>
				<div className='flex flex-col'>
					<p className={employeeFormStyles.title}>Editar Empleado</p>
					<p className={employeeFormStyles.subtitle}>
						Modifica los campos que desees actualizar
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='space-y-4'>
					{/* Información Personal */}
					<div className={employeeFormStyles.form.section}>
						<h3 className={employeeFormStyles.sectionTitle}>
							Información Personal
						</h3>
						<div className={employeeFormStyles.form.grid}>
							<Input
								label='Nombre Completo'
								name='nombre'
								value={editedEmployee.nombre}
								onChange={handleChange}
								isRequired
								classNames={employeeFormStyles.input}
							/>
							<Input
								label='Correo Electrónico'
								name='email'
								type='email'
								value={editedEmployee.email}
								onChange={handleChange}
								isRequired
								classNames={employeeFormStyles.input}
							/>
							<Input
								label='Teléfono'
								name='telefono'
								value={editedEmployee.telefono}
								onChange={handleChange}
								isRequired
								classNames={employeeFormStyles.input}
							/>
							<Input
								label='Dirección'
								name='direccion'
								value={editedEmployee.direccion}
								onChange={handleChange}
								isRequired
								classNames={employeeFormStyles.input}
							/>
						</div>
					</div>

					{/* Información Laboral */}
					<div className={employeeFormStyles.form.section}>
						<h3 className={employeeFormStyles.sectionTitle}>
							Información Laboral
						</h3>
						<div className={employeeFormStyles.form.grid}>
							<Input
								label='Puesto'
								name='puesto'
								value={editedEmployee.puesto}
								onChange={handleChange}
								isRequired
								classNames={employeeFormStyles.input}
							/>
							<Input
								label='Salario'
								name='salario'
								type='number'
								value={String(editedEmployee.salario)}
								onChange={handleChange}
								placeholder='$0.00'
								isRequired
								classNames={employeeFormStyles.input}
							/>
							<Select
								label='Rol'
								selectedKeys={[editedEmployee.rol]}
								onChange={(e) =>
									handleSelectChange('rol', e.target.value)
								}
								className='w-full'
								classNames={employeeFormStyles.select}
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
					<div className={employeeFormStyles.imageSection.container}>
						<h3 className={employeeFormStyles.sectionTitle}>
							Foto del Empleado
						</h3>
						<div className='flex items-center gap-4'>
							{editedEmployee.img && (
								<div
									className={
										employeeFormStyles.imageSection.preview
									}
								>
									<Image
										src={editedEmployee.img}
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
								classNames={employeeFormStyles.input}
							/>
						</div>
					</div>
				</div>
			</CardBody>

			<Divider />

			<CardFooter className={employeeFormStyles.footer.container}>
				<Button
					className={employeeFormStyles.footer.saveButton}
					size='sm'
					onPress={handleSubmit}
				>
					Guardar Cambios
				</Button>

				<Link
					className={employeeFormStyles.footer.cancelButton}
					href={`/dashboard/empleados/${editedEmployee.id_empleado}`}
				>
					Cancelar
				</Link>
			</CardFooter>
		</Card>
	)
}

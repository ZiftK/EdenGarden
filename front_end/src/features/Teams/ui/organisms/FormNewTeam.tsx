'use client'

import { useState, useEffect } from 'react'
import { useTeamStore } from '../../model/teamStore'
import { useRouter } from 'next/navigation'
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
	Spinner,
} from '@heroui/react'
import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import Link from 'next/link'
import { employeeFormStyles } from '@/src/features/Employees/ui/styles/employeeForm'

export default function FormNewTeam() {
	const router = useRouter()
	const { createTeam } = useTeamStore()
	const { employees, getEmployees, isLoading } = useEmployeeStore()
	const [formData, setFormData] = useState({
		nombre: '',
		lider_id: '',
		empleados_ids: [] as string[],
	})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				console.log('Fetching employees...')
				await getEmployees()
			} catch (error) {
				setError('Error al cargar los empleados')
				console.error('Error fetching employees:', error)
			}
		}
		fetchEmployees()
	}, [getEmployees])

	const handleSubmit = () => {
		try {
			if (!formData.nombre || !formData.lider_id) {
				setError('Por favor complete todos los campos requeridos')
				return
			}

			const teamData = {
				nombre: formData.nombre,
				lider_id: parseInt(formData.lider_id),
				empleados_ids: formData.empleados_ids.map((id) => parseInt(id)),
			}

			createTeam(teamData)
			router.push('/dashboard/equipos')
		} catch (error) {
			setError((error as Error).message)
		}
	}

	const availableEmployees = Array.isArray(employees)
		? employees.filter((emp) => emp.rol !== 'admin' && !emp.fk_equipo)
		: []

	const leaderEmployees = Array.isArray(employees)
		? employees.filter((emp) => emp.rol === 'leader' && !emp.fk_equipo)
		: []

	console.log('Filtered employees:', {
		total: employees?.length || 0,
		available: availableEmployees.length,
		leaders: leaderEmployees.length,
		employeesIsArray: Array.isArray(employees),
		sampleEmployee: employees?.[0],
		availableEmployeesSample: availableEmployees[0],
		leaderEmployeesSample: leaderEmployees[0],
	})

	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<Spinner size='lg' />
			</div>
		)
	}

	return (
		<Card className={employeeFormStyles.container}>
			<CardHeader className='flex gap-3'>
				<div className='flex flex-col'>
					<p className={employeeFormStyles.title}>
						Crear Nuevo Equipo
					</p>
					<p className={employeeFormStyles.subtitle}>
						Complete todos los campos requeridos
					</p>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<div className='space-y-4'>
					{/* Información del Equipo */}
					<div className={employeeFormStyles.form.section}>
						<h3 className={employeeFormStyles.sectionTitle}>
							Información del Equipo
						</h3>
						<div className={employeeFormStyles.form.grid}>
							<Input
								label='Nombre del Equipo'
								placeholder='Ingrese el nombre del equipo'
								value={formData.nombre}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										nombre: e.target.value,
									}))
								}
								classNames={employeeFormStyles.input}
								isRequired
							/>

							<Select
								label='Líder del Equipo'
								placeholder='Seleccione el líder'
								selectedKeys={
									formData.lider_id ? [formData.lider_id] : []
								}
								onSelectionChange={(keys) => {
									const selectedId =
										Array.from(keys)[0]?.toString()
									console.log('Selected leader:', selectedId)
									setFormData((prev) => ({
										...prev,
										lider_id: selectedId || '',
									}))
								}}
								classNames={employeeFormStyles.select}
								isRequired
							>
								{leaderEmployees.map((employee) => (
									<SelectItem
										key={employee.id_empleado.toString()}
									>
										{employee.nombre} - {employee.puesto}
									</SelectItem>
								))}
							</Select>
						</div>
					</div>

					{/* Miembros del Equipo */}
					<div className={employeeFormStyles.form.section}>
						<h3 className={employeeFormStyles.sectionTitle}>
							Miembros del Equipo
						</h3>
						<div className={employeeFormStyles.form.grid}>
							<Select
								label='Seleccionar Miembros'
								placeholder='Seleccione los miembros'
								selectionMode='multiple'
								selectedKeys={new Set(formData.empleados_ids)}
								onSelectionChange={(keys) => {
									const selectedIds = Array.from(keys).map(
										(id) => id.toString()
									)
									console.log(
										'Selected members:',
										selectedIds
									)
									setFormData((prev) => ({
										...prev,
										empleados_ids: selectedIds,
									}))
								}}
								classNames={employeeFormStyles.select}
							>
								{availableEmployees.map((employee) => (
									<SelectItem
										key={employee.id_empleado.toString()}
									>
										{employee.nombre} - {employee.puesto}
									</SelectItem>
								))}
							</Select>
						</div>
					</div>

					{error && (
						<p className='text-red-500 text-sm mt-2'>{error}</p>
					)}
				</div>
			</CardBody>

			<Divider />

			<CardFooter className={employeeFormStyles.footer.container}>
				<Button
					className={employeeFormStyles.footer.saveButton}
					onPress={handleSubmit}
				>
					Crear Equipo
				</Button>

				<Link
					className={employeeFormStyles.footer.cancelButton}
					href='/dashboard/equipos'
				>
					Cancelar
				</Link>
			</CardFooter>
		</Card>
	)
}

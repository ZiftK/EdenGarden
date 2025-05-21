import { useState } from 'react'
import { useTeamStore } from '../../model/teamStore'
import { useRouter } from 'next/navigation'
import { Input, Button, Select, SelectItem } from '@heroui/react'
import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'

export default function FormNewTeam() {
	const router = useRouter()
	const { createTeam } = useTeamStore()
	const { employees } = useEmployeeStore()
	const [formData, setFormData] = useState({
		nombre: '',
		lider_id: '',
		empleados_ids: [] as string[],
	})
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
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

			await createTeam(teamData)
			router.push('/dashboard/equipos')
		} catch (error) {
			setError((error as Error).message)
		}
	}

	const availableEmployees = employees.filter((emp) => emp.rol !== 'admin')
	const leaderEmployees = employees.filter((emp) => emp.rol === 'leader')

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-4 max-w-xl mx-auto p-4'
		>
			<div className='space-y-4'>
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
					required
				/>

				<Select
					label='Líder del Equipo'
					placeholder='Seleccione el líder'
					value={formData.lider_id}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							lider_id: e.target.value,
						}))
					}
					required
				>
					{leaderEmployees.map((employee) => (
						<SelectItem
							key={employee.id_empleado}
							value={employee.id_empleado.toString()}
						>
							{employee.nombre}
						</SelectItem>
					))}
				</Select>

				<Select
					label='Miembros del Equipo'
					placeholder='Seleccione los miembros'
					selectionMode='multiple'
					value={formData.empleados_ids}
					onChange={(e) =>
						setFormData((prev) => ({
							...prev,
							empleados_ids: Array.from(
								e.target.selectedOptions,
								(option) => option.value
							),
						}))
					}
				>
					{availableEmployees.map((employee) => (
						<SelectItem
							key={employee.id_empleado}
							value={employee.id_empleado.toString()}
						>
							{employee.nombre}
						</SelectItem>
					))}
				</Select>
			</div>

			{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

			<div className='flex justify-end gap-2 mt-4'>
				<Button
					type='button'
					color='danger'
					variant='light'
					onClick={() => router.back()}
				>
					Cancelar
				</Button>
				<Button type='submit' color='primary'>
					Crear Equipo
				</Button>
			</div>
		</form>
	)
}

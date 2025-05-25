'use client'

import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import EmployeeDetails from './components/EmployeeDetails'
import { useEffect } from 'react'
import Loading from './loading'
import { useParams } from 'next/navigation'

export default function Page() {
	const params = useParams()
	const employeeId = params?.empleado as string
	const {
		getEmployeeById,
		currentEmployee,
		isLoading,
		isInitialLoading,
		error,
		clearCurrentEmployee,
	} = useEmployeeStore()

	useEffect(() => {
		if (employeeId) {
			getEmployeeById(employeeId)
		}

		return () => {
			clearCurrentEmployee()
		}
	}, [employeeId, getEmployeeById, clearCurrentEmployee])

	// Mostrar el loader durante la carga inicial
	if (isInitialLoading) {
		return <Loading />
	}

	// Mostrar error si existe
	if (error) {
		return (
			<div className='relative flex items-center justify-center h-full text-[var(--father-font)]'>
				{error}
			</div>
		)
	}

	// Mostrar mensaje si no hay empleado
	if (!currentEmployee && !isLoading) {
		return (
			<div className='relative flex items-center justify-center h-full text-[var(--father-font)]'>
				No se encontró el empleado
			</div>
		)
	}

	// Mostrar los detalles del empleado
	return <EmployeeDetails employee={currentEmployee} />
}

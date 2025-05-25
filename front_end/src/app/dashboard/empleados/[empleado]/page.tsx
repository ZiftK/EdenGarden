'use client'

import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import EmployeeDetails from './components/EmployeeDetails'
import { useEffect, useState } from 'react'
import Loading from './loading'
import { useParams } from 'next/navigation'

export default function Page() {
	const params = useParams()
	const { getEmployeeById, currentEmployee, isLoading, error } =
		useEmployeeStore()
	const employeeId = params?.empleado as string
	const [isInitialLoad, setIsInitialLoad] = useState(true)

	useEffect(() => {
		const loadEmployee = async () => {
			if (employeeId) {
				setIsInitialLoad(true)
				try {
					await getEmployeeById(employeeId)
				} catch (error) {
					console.error('Error loading employee:', error)
				} finally {
					setIsInitialLoad(false)
				}
			}
		}

		loadEmployee()

		// Cleanup function
		return () => {
			setIsInitialLoad(false)
		}
	}, [employeeId, getEmployeeById])

	console.log('Page render state:', {
		isInitialLoad,
		isLoading,
		currentEmployee,
		error,
	})

	// Show loading state
	if (isInitialLoad || isLoading) {
		return <Loading />
	}

	// Show error state
	if (error) {
		return (
			<div className='flex items-center justify-center h-full text-[var(--father-font)]'>
				{error}
			</div>
		)
	}

	// Show not found state
	if (!currentEmployee) {
		return (
			<div className='flex items-center justify-center h-full text-[var(--father-font)]'>
				No se encontró el empleado
			</div>
		)
	}

	// Show employee details
	return <EmployeeDetails employee={currentEmployee} />
}

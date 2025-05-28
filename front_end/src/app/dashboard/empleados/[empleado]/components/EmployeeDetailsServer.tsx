'use client'

import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import EmployeeDetails from './EmployeeDetails'
import { useEffect } from 'react'

export default function EmployeeDetailsServer({
	employeeId,
}: {
	employeeId: string
}) {
	const { getEmployeeById, currentEmployee, isLoading } = useEmployeeStore()

	useEffect(() => {
		getEmployeeById(employeeId)
	}, [employeeId, getEmployeeById])

	if (isLoading) return null // El loading.tsx se encargará de mostrar el estado de carga

	return <EmployeeDetails employee={currentEmployee} />
}

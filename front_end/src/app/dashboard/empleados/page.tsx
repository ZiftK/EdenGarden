'use client'

import { getEmployees } from '@/src/features/Employees/api/getEmployees'
import { renderCell } from '@/src/features/Employees/ui/moleculs/renderCell'
import Title from '@/src/shared/components/atoms/Title'
import { Employee } from '@/src/shared/types'
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Input,
} from '@heroui/react'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'

type ColumnKey = keyof Employee | 'actions'

export default function Page() {
	const { employees, getEmployees, isLoading, error } = useEmployeeStore()
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		getEmployees()
	}, [getEmployees])

	const columns = [
		{ uid: 'nombre' as ColumnKey, name: 'Nombre' },
		{ uid: 'rol' as ColumnKey, name: 'Rol' },
		{ uid: 'actions' as ColumnKey, name: 'Acciones' },
	]
	const render = useCallback(renderCell, [])

	// Filter employees based on search term
	const filteredEmployees = useMemo(() => {
		if (!searchTerm) return employees
		const searchLower = searchTerm.toLowerCase()
		return employees.filter(
			(employee) =>
				employee.id_empleado.toString().includes(searchLower) || // Search by ID (expediente)
				employee.nombre.toLowerCase().includes(searchLower) || // Also allow searching by name
				employee.rol.toLowerCase().includes(searchLower) // And by role
		)
	}, [employees, searchTerm])

	if (isLoading) return <div>Cargando...</div>
	if (error) return <div className='text-red-500'>{error}</div>

	return (
		<section
			aria-labelledby='dashboard-section-title'
			className='overflow-x-auto w-full mt-4 text-[var(--father-font)] mx-auto col-start-1 md:row-start-2 md:!col-start-1 md:row-span-3 xl:!col-start-2'
		>
			<div className='flex flex-col gap-4'>
				<Title
					title='Empleados'
					btn={{ active: true, path: '/dashboard/empleados/crear' }}
				/>

				<Input
					type='text'
					placeholder='Buscar por expediente, nombre o rol...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='max-w-xs mb-4 ml-auto'
					classNames={{
						base: '!bg-transparent !font-normal !text-sm',
						input: 'text-[var(--father-font)]',
						inputWrapper: [
							'bg-transparent',
							'hover:!bg-white/30',
							'data-[hover=true]:!bg-white/30',
							'group-data-[focus=true]:bg-white/30',
						],
					}}
				/>

				<Table
					aria-label='Example table with custom cells'
					className='mx-auto max-h-[calc(100%-45px)] lg:max-w-10/12 !w-full [&>div]:!bg-transparent [&>div]:p-0 [&>div]:w-full scrollbar-thin-custom min-w-11/12'
					color='success'
					classNames={{
						base: '!bg-transparent !font-normal !text-sm',
						table: 'bg-transparent !p-0 !border-0 ',
					}}
				>
					<TableHeader columns={columns}>
						{(column) => (
							<TableColumn
								className='!bg-[#0002] text-md text-white'
								key={column.uid}
								align={
									column.uid === 'actions'
										? 'center'
										: 'start'
								}
							>
								{column.name}
							</TableColumn>
						)}
					</TableHeader>
					<TableBody items={filteredEmployees}>
						{(item) => (
							<TableRow key={item.id_empleado}>
								{(columnKey) => (
									<TableCell>
										{render(item, columnKey as ColumnKey)}
									</TableCell>
								)}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	)
}

'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { useAttendanceStore } from '../model/attendanceStore'
import { AttendanceRecord } from '../types'
import {
	Card,
	CardBody,
	CardHeader,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from '@heroui/react'

const columns = [
	{ key: 'fecha', label: 'Fecha' },
	{ key: 'empleado', label: 'Empleado' },
	{ key: 'hora_entrada', label: 'Hora Entrada' },
	{ key: 'hora_salida', label: 'Hora Salida' },
	{ key: 'horas_trabajadas', label: 'Horas Trabajadas' },
	{ key: 'horas_extra', label: 'Horas Extra' },
	{ key: 'actions', label: 'Acciones' },
]

export default function AttendanceTable() {
	const { user } = useAuthStore()
	const {
		attendance,
		teamMembers,
		isLoading,
		error,
		getTeamAttendance,
		getEmployeeAttendance,
		getTeamMembers,
		markAttendance,
		markExit,
	} = useAttendanceStore()

	useEffect(() => {
		const fetchData = async () => {
			if (user?.rol === 'lider' && user.fk_equipo) {
				await Promise.all([
					getTeamMembers(user.fk_equipo),
					getTeamAttendance(user.fk_equipo),
				])
			} else if (user?.rol === 'user' && user.id_empleado) {
				await getEmployeeAttendance(user.id_empleado)
			}
		}

		fetchData()
	}, [user, getTeamMembers, getTeamAttendance, getEmployeeAttendance])

	if (isLoading) {
		return <div>Cargando...</div>
	}

	if (error) {
		return <div className='text-red-500'>{error}</div>
	}

	// Filter columns based on user role
	const visibleColumns =
		user?.rol === 'lider'
			? columns
			: columns.filter((col) => col.key !== 'actions')

	const renderActionCell = (record: AttendanceRecord) => {
		if (user?.rol !== 'lider') return <TableCell>-</TableCell>

		return (
			<TableCell>
				<div className='flex gap-2'>
					<Button
						size='sm'
						onClick={() => markAttendance(record.fk_empleado)}
					>
						Entrada
					</Button>
					{record.hora_entrada && !record.hora_salida && (
						<Button
							size='sm'
							color='warning'
							onClick={() => markExit(record.id_asistencia)}
						>
							Salida
						</Button>
					)}
				</div>
			</TableCell>
		)
	}

	return (
		<Card className='w-full bg-[var(--bg-card-obscure)]'>
			<CardHeader>
				<h3 className='text-lg font-bold'>
					{user?.rol === 'lider'
						? 'Asistencia del Equipo'
						: 'Mi Asistencia'}
				</h3>
			</CardHeader>
			<CardBody>
				<Table aria-label='Tabla de asistencia' className='min-w-full'>
					<TableHeader>
						{visibleColumns.map((column) => (
							<TableColumn key={column.key}>
								{column.label}
							</TableColumn>
						))}
					</TableHeader>
					<TableBody emptyContent='No hay registros de asistencia'>
						{attendance.map((record) => (
							<TableRow key={record.id_asistencia}>
								<TableCell>{record.fecha}</TableCell>
								<TableCell>
									{teamMembers.find(
										(m) =>
											m.id_empleado === record.fk_empleado
									)?.nombre ||
										user?.nombre ||
										'N/A'}
								</TableCell>
								<TableCell>{record.hora_entrada}</TableCell>
								<TableCell>
									{record.hora_salida || '-'}
								</TableCell>
								<TableCell>
									{record.horas_trabajadas || '-'}
								</TableCell>
								<TableCell>
									{record.horas_extra || '-'}
								</TableCell>
								{renderActionCell(record)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardBody>
		</Card>
	)
}

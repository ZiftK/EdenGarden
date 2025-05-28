import { useAttendanceStore } from '@/src/features/Attendance/model/attendanceStore'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useAuthStore } from '../../auth/model/useAuthStore'
import { useTeamStore } from '@/src/features/Teams/model/teamStore'
import { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/react'

export default function AttendanceCard() {
	const { user } = useAuthStore()
	const { attendance, getTeamAttendance, markAttendance } =
		useAttendanceStore()
	const { teams, isLoading } = useTeamStore()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [showAttendance, setShowAttendance] = useState(false)

	useEffect(() => {
		const fetchAttendance = async () => {
			if (user?.rol === 'lider' && user) {
				await getTeamAttendance(user.fk_equipo!)
			}
		}
		fetchAttendance()
	}, [user?.rol, user?.fk_equipo, getTeamAttendance])

	const handleMarkAttendance = async (employeeId: number) => {
		try {
			setIsSubmitting(true)
			await markAttendance(employeeId)
			// Refresh attendance data
			if (user?.rol === 'lider' && user.fk_equipo) {
				await getTeamAttendance(user.fk_equipo)
			}
		} catch (error) {
			console.error('Error marking attendance:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const hasAttendanceToday = (employeeId: number): boolean => {
		const today = new Date()
		const todayAttendance = attendance.find(
			(a) =>
				a.fk_empleado === employeeId &&
				new Date(a.fecha).toDateString() === today.toDateString()
		)
		return !!todayAttendance
	}

	if (!user?.rol || user.rol !== 'lider' || isLoading) {
		return (
			<div className='flex items-center justify-center p-4'>
				{isLoading
					? 'Cargando...'
					: 'No tienes acceso a esta funcionalidad'}
			</div>
		)
	}

	const userTeam = teams?.find((team) => team.id_equipo === user.fk_equipo)

	return (
		<div className='space-y-4'>
			<Card className='bg-[var(--bg-card-obscure)]'>
				<CardHeader>
					<h3 className='text-lg font-bold'>Pasar Lista</h3>
				</CardHeader>
				<CardBody>
					<div className='space-y-4'>
						<div className='flex justify-between items-center'>
							<button
								onClick={() =>
									setShowAttendance(!showAttendance)
								}
								className='px-4 py-2 bg-[var(--green-dark-500)] text-white rounded-md hover:bg-[var(--green-dark-600)] transition-colors'
							>
								{showAttendance
									? 'Ocultar Lista'
									: 'Mostrar Lista'}
							</button>
							<p className='text-sm'>
								{format(new Date(), 'EEEE d MMMM', {
									locale: es,
								})}
							</p>
						</div>

						{showAttendance && userTeam && (
							<div className='space-y-2'>
								{userTeam.empleados?.map((member) => (
									<div
										key={member.id_empleado}
										className='flex items-center justify-between p-3 bg-[var(--bg-card-obscure-200)] rounded-md'
									>
										<span className='font-medium'>
											{member.nombre}
										</span>
										<button
											onClick={() =>
												handleMarkAttendance(
													member.id_empleado
												)
											}
											disabled={
												isSubmitting ||
												hasAttendanceToday(
													member.id_empleado
												)
											}
											className={`px-4 py-2 rounded-md transition-colors ${
												hasAttendanceToday(
													member.id_empleado
												)
													? 'bg-gray-500 text-white'
													: 'bg-[var(--green-dark-500)] text-white hover:bg-[var(--green-dark-600)]'
											}`}
										>
											{hasAttendanceToday(
												member.id_empleado
											)
												? '✓'
												: 'Marcar'}
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</CardBody>
			</Card>
		</div>
	)
}

'use client'

import { Card, CardBody, CardHeader } from '@heroui/react'
import { useEffect, useState } from 'react'
import { getTeams } from '@/src/features/Teams/api/getTeams'
import getProjects from '@/src/features/Projets/api/getProjects'
import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import { useContactStore } from '@/src/features/Contact/model/contactStore'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import {
	GroupIcon,
	MessageIcon,
	CertifiedIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import Link from 'next/link'
import Title from '@/src/shared/components/atoms/Title'
import DataProyectContract from '@/src/components/ERP/moleculs/DataProyectContract'
import ChartTeams from '@/src/components/ERP/moleculs/ChartTeams'
import TableEmployees from '@/src/components/ERP/moleculs/TableEmployees'
import AttendanceTable from '@/src/features/Attendance/components/AttendanceTable'
import { ShortTeam } from '@/src/shared/types'
import { Project } from '@/src/features/Projets/types'
import { customDateToDateString } from '@/src/shared/hooks/useDatesCustoms'

export default function DashboardPage() {
	const [teams, setTeams] = useState<ShortTeam[]>([])
	const [projects, setProjects] = useState<Project[]>([])
	const { employees, getEmployees } = useEmployeeStore()
	const { messages, getMessages } = useContactStore()
	const { user } = useAuthStore()

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (user?.rol === 'lider') {
					// For leaders, only fetch their team and related projects
					const teamsData = await getTeams()
					const userTeam = teamsData.find(
						(team) => team.lider.id_empleado === user.id_empleado
					)
					setTeams(userTeam ? [userTeam] : [])

					const projectsData = await getProjects()
					const teamProjects = projectsData.filter(
						(project) =>
							project.equipo?.id_equipo === userTeam?.id_equipo
					)
					setProjects(teamProjects)
				} else if (user?.rol === 'user') {
					// For regular users, only fetch their team info
					const teamsData = await getTeams()
					const userTeam = teamsData.find((team) =>
						team.empleados.some(
							(emp) => emp.id_empleado === user.id_empleado
						)
					)
					setTeams(userTeam ? [userTeam] : [])

					const projectsData = await getProjects()
					const teamProjects = projectsData.filter(
						(project) =>
							project.equipo?.id_equipo === userTeam?.id_equipo
					)
					setProjects(teamProjects)
				} else {
					// For admins, fetch all data
					const [teamsData, projectsData] = await Promise.all([
						getTeams(),
						getProjects(),
					])
					setTeams(teamsData)
					setProjects(projectsData)
				}

				await getEmployees()
				await getMessages()
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [getEmployees, getMessages, user])

	const colorIcons = 'var(--father-font)'
	const unreadMessages = messages?.filter((m) => !m.read).length || 0
	const activeProjects = projects.filter((p) => p.estado === 'ACTIVO').length
	const projectsWithIssues = projects.filter(
		(p) => p.estado === 'CON_PROBLEMAS'
	).length

	const projectsForDisplay = projects.map((project) => ({
		name: project.nombre,
		price: project.costo,
		startDate: project.calendario?.fecha_inicio
			? customDateToDateString(project.calendario.fecha_inicio)
			: '',
		endDate: project.calendario?.fecha_fin
			? customDateToDateString(project.calendario.fecha_fin)
			: '',
		teem: project.equipo?.nombre || 'Sin equipo',
	}))

	return (
		<section className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-span-3 md:row-end-4 xl:mx-auto xl:w-full xl:col-start-2 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin-custom'>
			<Title title='Panel de Control' btn={{ active: false, path: '' }} />

			{/* Only show top cards for admin and leader roles */}
			{user?.rol !== 'user' && (
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6'>
					{/* Card de Proyectos */}
					<Link href='/dashboard/proyectos'>
						<Card className='bg-[var(--bg-card-obscure)] hover:bg-[var(--bg-card-obscure-200)] transition-colors'>
							<CardBody>
								<div className='flex justify-between items-center mb-2'>
									<h3 className='text-lg font-bold'>
										{activeProjects} Proyectos
									</h3>
									<div className='p-3 rounded-full bg-[var(--green-dark-500)]'>
										<CertifiedIcon
											h={24}
											color={colorIcons}
										/>
									</div>
								</div>
								<p className='text-sm text-[var(--children-font)]'>
									{projectsWithIssues} con incidencias
								</p>
							</CardBody>
						</Card>
					</Link>

					{/* Card de Equipos */}
					<Link href='/dashboard/equipos'>
						<Card className='bg-[var(--bg-card-obscure)] hover:bg-[var(--bg-card-obscure-200)] transition-colors'>
							<CardBody>
								<div className='flex justify-between items-center mb-2'>
									<h3 className='text-lg font-bold'>
										{teams.length} Equipos
									</h3>
									<div className='p-3 rounded-full bg-[var(--green-dark-500)]'>
										<GroupIcon h={24} color={colorIcons} />
									</div>
								</div>
								<p className='text-sm text-[var(--children-font)]'>
									{employees.length} empleados activos
								</p>
							</CardBody>
						</Card>
					</Link>

					{/* Card de Mensajes */}
					<Link href='/dashboard/mensajes'>
						<Card className='bg-[var(--bg-card-obscure)] hover:bg-[var(--bg-card-obscure-200)] transition-colors'>
							<CardBody>
								<div className='flex justify-between items-center mb-2'>
									<h3 className='text-lg font-bold'>
										{unreadMessages} Mensajes
									</h3>
									<div className='p-3 rounded-full bg-[var(--green-dark-500)]'>
										<MessageIcon
											h={24}
											color={colorIcons}
										/>
									</div>
								</div>
								<p className='text-sm text-[var(--children-font)]'>
									sin leer
								</p>
							</CardBody>
						</Card>
					</Link>
				</div>
			)}

			<div className='grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4'>
				{/* Attendance Table - Show for all roles */}
				<AttendanceTable />

				{/* Projects and Teams info - Show based on role */}
				{user?.rol !== 'user' && (
					<>
						<Card className='bg-[var(--bg-card-obscure)]'>
							<CardHeader>
								<h3 className='text-lg font-bold'>
									Proyectos en Curso
								</h3>
							</CardHeader>
							<CardBody>
								<DataProyectContract
									data={projectsForDisplay}
								/>
							</CardBody>
						</Card>

						<Card className='bg-[var(--bg-card-obscure)]'>
							<CardHeader>
								<h3 className='text-lg font-bold'>
									Distribución de Equipos
								</h3>
							</CardHeader>
							<CardBody>
								<ChartTeams />
							</CardBody>
						</Card>

						<Card className='bg-[var(--bg-card-obscure)]'>
							<CardHeader>
								<h3 className='text-lg font-bold'>
									Empleados Activos
								</h3>
							</CardHeader>
							<CardBody>
								<TableEmployees />
							</CardBody>
						</Card>
					</>
				)}
			</div>
		</section>
	)
}

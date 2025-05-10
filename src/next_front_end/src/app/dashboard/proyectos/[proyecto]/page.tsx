import {
	CalendarIcon,
	TableRowsIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import TableTeams from '@/src/components/ERP/moleculs/TablesTeam/Table'
import { GroupIcon } from '@/src/components/landing/atoms/Icons/Icons'
import CalendarProject from '@/src/entities/calendar/ui/CalendarProjects/CalendarProject'
import DateProgressBar from '@/src/features/Projets/components/atoms/DateProgressBar'
import getProjects from '@/src/features/Projets/model/getProjects'
import { Card, CardBody, CardHeader } from '@heroui/react'
import Link from 'next/link'

export default async function Page({
	params,
}: {
	params: { proyecto: string }
}) {
	const projects = await getProjects()
	const project = projects.find(
		(project) => project.name === decodeURIComponent(params['proyecto'])
	)

	if (!project) return null
	const colorIcons = 'var(--children-font)'

	return (
		<section className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<Link href={'./'} className='text-[var(--green-dark-500)]'>
					Proyectos
				</Link>{' '}
				/ {decodeURIComponent(project!.name)}
			</h2>

			<Card className='z-0 bg-[var(--bg-card-obscure-200)] text-[var(--father-font)]'>
				<CardHeader className='flex flex-col gap-0.5 items-start w-full font-bold'>
					{project.name}
					<span className='flex items-center gap-1 w-full text-[var(--children-font)]'>
						<TableRowsIcon h={20} color={colorIcons} />
						<DateProgressBar
							startDate={project.calendar.intial_date}
							endDate={project.calendar.final_date}
						/>
					</span>
				</CardHeader>

				<CardBody className='flex flex-col gap-4'>
					<div>
						<Link
							href={`/dashboard/proyectos/${project.name}`}
							className='font-medium text-md'
						>
							{project.name}
						</Link>
						<span className='flex items-center gap-1 text-sm text-[var(--children-font)] mb-3.5'>
							<GroupIcon size={[15, 15]} color={colorIcons} />
							Conformado por {project.teams.members.length}{' '}
							miembros
						</span>

						<TableTeams team={project.teams} />
					</div>

					<div>
						<h3 className='font-medium text-md'>
							Calendario de proyecto
						</h3>
						<span className='flex items-center gap-1 text-sm text-[var(--children-font)] mb-3.5'>
							<CalendarIcon h={15} color={colorIcons} />
							{project.calendar.intial_date.toLocaleDateString()}{' '}
							- {project.calendar.final_date.toLocaleDateString()}
						</span>
						<CalendarProject
							initialDate={project.calendar.intial_date}
							finalDate={project.calendar.final_date}
							nonWorkingDays={project.calendar.non_working_days}
						/>
					</div>
				</CardBody>
			</Card>
		</section>
	)
}

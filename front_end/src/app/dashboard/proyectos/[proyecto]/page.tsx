import {
	AlertDiamondIcon,
	CalendarIcon,
	InfoHouseIcon,
	TableRowsIcon,
	UserIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import TableTeams from '@/src/components/ERP/moleculs/TablesTeam/Table'
import {
	EmailIcon,
	GroupIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import CalendarProject from '@/src/entities/calendar/ui/CalendarProjects/CalendarProject'
import DateProgressBar from '@/src/features/Projets/components/atoms/DateProgressBar'
import PriceChip from '@/src/features/Projets/components/PriceChip'
import getProjects from '@/src/features/Projets/model/getProjects'
import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import Image from 'next/image'
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
		<section className='text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2 '>
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<Link href={'./'} className='text-[var(--green-dark-500)]'>
					Proyectos
				</Link>{' '}
				/ {decodeURIComponent(project!.name)}
			</h2>

			<article className='xl:flex gap-10 max-h-[calc(100%-45px)] overflow-y-auto scrollbar-thin-custom'>
				<Card className='z-0 bg-[var(--bg-card-obscure-200)] pb-5 text-[var(--father-font)] xl:h-full xl:col-start-1 top-0 xl:flex-7/12'>
					<CardHeader className='flex flex-col gap-0.5 items-start w-full font-bold mb-6'>
						{project.name}
						<span className='flex items-center gap-1 w-full text-sm text-[var(--children-font)]'>
							<TableRowsIcon h={15} color={colorIcons} />
							<DateProgressBar
								startDate={project.calendar.intial_date!}
								endDate={project.calendar.final_date!}
							/>
						</span>
					</CardHeader>

					<CardBody className='flex flex-col gap-10 scrollbar-thin-custom px-4'>
						<div>
							<Link
								href={`/dashboard/proyectos/${project.name}`}
								className='font-medium text-md'
							>
								{project.name}
							</Link>
							<span className='flex items-center gap-1 text-sm text-[var(--father-font)] mb-3.5'>
								<GroupIcon h={15} color={colorIcons} />
								Conformado por {
									project.teams.members.length
								}{' '}
								miembros
							</span>

							<TableTeams team={project.teams} />
						</div>

						<div>
							<h3 className='font-medium text-md'>
								Calendario de proyecto
							</h3>
							<span className='flex items-center gap-1 text-sm text-[var(--father-font)] mb-3.5'>
								<CalendarIcon h={15} color={colorIcons} />
								{project.calendar.intial_date!.toLocaleDateString()}{' '}
								-{' '}
								{project.calendar.final_date!.toLocaleDateString()}
							</span>
							<CalendarProject
								initialDate={project.calendar.intial_date!}
								finalDate={project.calendar.final_date!}
								nonWorkingDays={
									project.calendar.non_working_days!
								}
							/>
						</div>
					</CardBody>
				</Card>

				<Card className='z-0 text-[var(--father-font)] mr-6 bg-transparent xl:col-start-2 xl:flex-5/12 shadow-none'>
					<CardHeader className='relative aspect-[16/9] w-full rounded-lg overflow-hidden'>
						<Image
							src={project.image!.src}
							alt={project.name}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							style={{
								objectFit: 'cover',
							}}
							priority
						/>
					</CardHeader>

					<CardBody className='m-0 p-0 mt-3'>
						<article className='flex justify-between'>
							<span className='text-md'>ID 185053</span>

							<div className='flex flex-col gap-4 ml-auto'>
								<PriceChip price={project.price} />
								<div className='flex mt-auto items-center gap-1 bg-[var(--bg-card-obscure-200)] w-fit rounded-md p-1.5'>
									<AlertDiamondIcon
										h={15}
										color={colorIcons}
									/>
									<span className='text-sm'>2 Problemas</span>
								</div>
							</div>
						</article>

						<Divider className='my-4' />

						<article>
							<h4 className='text-lg font-bold'>
								Datos del cliente
							</h4>

							<div className='flex flex-col gap-3 text-sm text-[var(--children-font)] mt-3'>
								<span className='flex items-center gap-1 '>
									<UserIcon h={15} color={colorIcons} />
									{project.clientData.name}
								</span>

								<span className='flex items-center gap-1 '>
									<InfoHouseIcon h={15} color={colorIcons} />
									{project.clientData.addressProject}
								</span>

								<span className='flex items-center gap-1 '>
									<PhoneIcon h={15} color={colorIcons} />
									{project.clientData.phone}
								</span>

								<span className='flex items-center gap-1 '>
									<EmailIcon h={15} color={colorIcons} />
									{project.clientData.email}
								</span>
							</div>
						</article>
					</CardBody>
				</Card>
			</article>
		</section>
	)
}

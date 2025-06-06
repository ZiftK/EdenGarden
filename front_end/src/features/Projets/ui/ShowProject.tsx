import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { Project } from '../types'
import {
	AlertDiamondIcon,
	CalendarIcon,
	InfoHouseIcon,
	TableRowsIcon,
	UserIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import DateProgressBar from '../components/atoms/DateProgressBar'
import Link from 'next/link'
import {
	EmailIcon,
	GroupIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import TableTeams from '@/src/components/ERP/moleculs/TablesTeam/Table'
import CalendarProject from '@/src/entities/calendar/ui/CalendarProjects/CalendarProject'
import Image from 'next/image'
import PriceChip from '../components/PriceChip'

export default function ShowProject({ project }: { project: Project }) {
	const colorIcons = 'var(--children-font)'

	return (
		<article className='xl:flex gap-10 max-h-[calc(100%-45px)] overflow-y-auto scrollbar-thin-custom'>
			<Card className='z-0 bg-[var(--bg-card-obscure-200)] pb-5 text-[var(--father-font)] xl:h-full xl:col-start-1 top-0 xl:flex-7/12'>
				<CardHeader className='flex flex-col gap-0.5 items-start w-full font-bold mb-6'>
					{/* {project?.nombre} */}
					<span className='flex items-center gap-1 w-full text-sm text-[var(--children-font)]'>
						<TableRowsIcon h={15} color={colorIcons} />
						<DateProgressBar
							startDate={
								new Date(
									project?.calendario?.fecha_inicio!.anno,
									project?.calendario?.fecha_inicio!.mes - 1,
									project?.calendario?.fecha_inicio!.dia
								)
							}
							endDate={
								new Date(
									project?.calendario?.fecha_fin!.anno,
									project?.calendario?.fecha_fin!.mes - 1,
									project?.calendario?.fecha_fin!.dia
								)
							}
						/>
					</span>
				</CardHeader>

				<CardBody className='flex flex-col gap-10 scrollbar-thin-custom px-4'>
					<div>
						<Link
							href={`/dashboard/equipos/${project?.equipo?.id_equipo}`}
							className='font-medium text-md'
						>
							{project?.equipo?.nombre}
						</Link>
						<span className='flex items-center gap-1 text-sm text-[var(--father-font)] mb-3.5'>
							<GroupIcon h={15} color={colorIcons} />
							Conformado por {
								project?.equipo?.empleados.length
							}{' '}
							miembros
						</span>

						<TableTeams team={project!.equipo!} />
					</div>

					<div>
						<h3 className='font-medium text-md'>
							Calendario de proyecto
						</h3>
						<span className='flex items-center gap-1 text-sm text-[var(--father-font)] mb-3.5'>
							<CalendarIcon h={15} color={colorIcons} />
							{new Date(
								project?.calendario?.fecha_inicio!.anno,
								project?.calendario?.fecha_inicio!.mes - 1,
								project?.calendario?.fecha_inicio!.dia
							).toLocaleDateString()}{' '}
							-{' '}
							{new Date(
								project?.calendario?.fecha_fin!.anno,
								project?.calendario?.fecha_fin!.mes - 1,
								project?.calendario?.fecha_fin!.dia
							).toLocaleDateString()}
						</span>
						<CalendarProject
							initialDate={
								new Date(
									project?.calendario?.fecha_inicio!.anno,
									project?.calendario?.fecha_inicio!.mes - 1,
									project?.calendario?.fecha_inicio!.dia
								)
							}
							finalDate={
								new Date(
									project?.calendario?.fecha_fin!.anno,
									project?.calendario?.fecha_fin!.mes - 1,
									project?.calendario?.fecha_fin!.dia
								)
							}
							nonWorkingDays={project?.calendario?.dias_no_laborables?.map(
								(date) =>
									new Date(date.anno, date.mes - 1, date.dia)
							)}
						/>
					</div>
				</CardBody>
			</Card>

			<Card className='z-0 text-[var(--father-font)] mr-6 bg-transparent xl:col-start-2 xl:flex-5/12 shadow-none'>
				<CardHeader className='relative aspect-[16/9] w-full rounded-lg overflow-hidden'>
					{project?.img && (
						<Image
							src={project?.img}
							alt={project?.nombre}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							style={{
								objectFit: 'cover',
							}}
							priority
						/>
					)}
				</CardHeader>

				<CardBody className='m-0 p-0 mt-3'>
					<article className='flex justify-between'>
						<span className='text-md'>ID 185053</span>

						<div className='flex flex-col gap-4 ml-auto'>
							<PriceChip price={String(project?.costo)} />
							<div className='flex mt-auto items-center gap-1 bg-[var(--bg-card-obscure-200)] w-fit rounded-md p-1.5'>
								<AlertDiamondIcon h={15} color={colorIcons} />
								<span className='text-sm w-fit'>
									2 Problemas
								</span>
							</div>
						</div>
					</article>

					<Divider className='my-4' />

					<article>
						<h4 className='text-lg font-bold'>Datos del cliente</h4>

						<div className='flex flex-col gap-3 text-sm text-[var(--children-font)] mt-3'>
							<span className='flex items-center gap-1 '>
								<UserIcon h={15} color={colorIcons} />
								{project?.cliente?.nombre}
							</span>

							<span className='flex items-center gap-1 '>
								<InfoHouseIcon h={15} color={colorIcons} />
								{project?.cliente?.direccion}
							</span>

							<span className='flex items-center gap-1 '>
								<PhoneIcon h={15} color={colorIcons} />
								{project?.cliente?.telefono}
							</span>

							<span className='flex items-center gap-1 '>
								<EmailIcon h={15} color={colorIcons} />
								{project?.cliente?.email}
							</span>
						</div>
					</article>
				</CardBody>
			</Card>
		</article>
	)
}

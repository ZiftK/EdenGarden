'use client'

import { Card, CardBody, CardHeader } from '@heroui/react'
import Link from 'next/link'

import {
	AlertDiamondIcon,
	CalendarIcon,
	TableRowsIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import { GroupIcon } from '@/src/components/landing/atoms/Icons/Icons'
import DateProgressBar from '@/src/features/Projets/components/atoms/DateProgressBar'
import PriceChip from '@/src/features/Projets/components/PriceChip'
import { useEffect, useState } from 'react'
import { Project } from '../types'

import getProjects from '../api/getProjects'
import { customDateToDateString } from '@/src/shared/hooks/useDatesCustoms'

const colorIcons = 'var(--children-font)'

export default function ShowAllProjects() {
	const [projects, setProjects] = useState<Project[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true)
				setError(null)
				const dataProjects = await getProjects()
				setProjects(dataProjects)
			} catch (error) {
				console.error('Error al obtener los proyectos:', error)
				setError('Error al cargar los proyectos')
			} finally {
				setLoading(false)
			}
		}
		fetchProjects()
	}, [])

	if (loading) {
		return (
			<>
				{[1, 2].map((index) => (
					<div key={index} className='animate-pulse'>
						<Card className='z-0 flex flex-col justify-between bg-[var(--bg-card-obscure-200)] text-[var(--father-font)] xl:h-56'>
							<CardHeader className='flex justify-between items-center'>
								<div className='flex flex-col gap-2'>
									<div className='w-48 h-6 bg-white/30 rounded' />
									<div className='w-32 h-4 bg-white/30 rounded' />
									<div className='w-24 h-4 bg-white/30 rounded' />
								</div>
								<div className='w-24 h-8 bg-white/30 rounded-lg' />
							</CardHeader>
							<CardBody>
								<div className='hidden md:flex flex-col gap-3 text-[var(--children-font)] text-xs mt-auto'>
									<div className='w-full h-4 bg-white/30 rounded' />
									<div className='w-full h-4 bg-white/30 rounded' />
									<div className='w-full h-4 bg-white/30 rounded' />
								</div>
								<div className='flex mt-auto items-center gap-1 bg-[var(--bg-card-obscure-300)] rounded-md p-1.5'>
									<div className='w-24 h-4 bg-white/30 rounded' />
								</div>
							</CardBody>
						</Card>
					</div>
				))}
			</>
		)
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-full text-[var(--father-font)]'>
				{error}
			</div>
		)
	}

	if (!projects.length) {
		return (
			<div className='flex items-center justify-center h-full text-[var(--father-font)]'>
				No hay proyectos disponibles
			</div>
		)
	}

	return (
		<>
			{projects.map((project) => (
				<Card
					key={project.nombre}
					className='z-0 flex flex-col justify-between bg-center bg-cover bg-no-repeat text-[var(--father-font)] xl:h-56'
					style={{
						background: `linear-gradient(to left, var(--bg-card-obscure-300), var(--bg-card-obscure-200) 20%, var(--bg-card-obscure) 40%), url(${project.img!}) right center no-repeat`,
						backgroundSize: 'auto, 40% 100%',
						backgroundPosition: 'left top, right center',
						backgroundRepeat: 'no-repeat, no-repeat',
						imageRendering: 'auto',
					}}
				>
					<CardHeader className='flex justify-between items-center'>
						<div className='flex flex-col'>
							<Link
								href={`/dashboard/proyectos/${project.id_proyecto}`}
								className='font-bold text-lg'
							>
								{project.nombre}
							</Link>
							<span className='font-normal text-md'>
								{project.equipo?.lider?.nombre ||
									'Sin líder asignado'}
							</span>
							<span className='font-light text-sm text-[var(--children-font)]'>
								ID {project.id_proyecto}
							</span>
						</div>
						<PriceChip price={String(project.costo)} />
					</CardHeader>
					<CardBody>
						<div className='hidden md:flex flex-col gap-1 text-[var(--children-font)] text-xs mt-auto'>
							<span className='flex items-center gap-1'>
								<GroupIcon h={15} color={colorIcons} />
								Conformado por{' '}
								{project.equipo?.empleados?.length || 0}{' '}
								miembros
							</span>
							<span className='flex items-center gap-1'>
								<CalendarIcon h={15} color={colorIcons} />
								{customDateToDateString(
									project.calendario.fecha_inicio!
								)}{' '}
								-{' '}
								{customDateToDateString(
									project.calendario.fecha_fin!
								)}
							</span>
							<span className='flex items-center gap-1'>
								<TableRowsIcon h={15} color={colorIcons} />
								<DateProgressBar
									startDate={
										new Date(
											project.calendario.fecha_inicio!.anno,
											project.calendario.fecha_inicio!
												.mes - 1,
											project.calendario.fecha_inicio!.dia
										)
									}
									endDate={
										new Date(
											project.calendario.fecha_fin!.anno,
											project.calendario.fecha_fin!.mes -
												1,
											project.calendario.fecha_fin!.dia
										)
									}
								/>
							</span>
						</div>
						<div className='flex mt-auto items-center gap-1 bg-[var(--bg-card-obscure-200)] rounded-md p-1.5'>
							<AlertDiamondIcon h={15} color={colorIcons} />
							<span className='text-sm'>2 Problemas</span>
						</div>
					</CardBody>
				</Card>
			))}
		</>
	)
}

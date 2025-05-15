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

const colorIcons = 'var(--children-font)'

export default function ShowAllProjects() {
	const [projects, setProjects] = useState<Project[]>([])
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const dataProjects = await getProjects()

				setProjects(dataProjects.proyectos)
			} catch (error) {
				console.error('Error al obtener los proyectos:', error)
			}
		}
		fetchProjects()
	}, [])

	return (
		<>
			{projects.map((project) => (
				<Card
					key={project.nombre}
					className='z-0 flex flex-col justify-between bg-center bg-cover bg-no-repeat text-[var(--father-font)] xl:h-56'
					// style={{
					// 	background: `linear-gradient(to left, var(--bg-card-obscure-300), var(--bg-card-obscure-200) 20%, var(--bg-card-obscure) 40%), url(${project.img!.src}) right center no-repeat`,
					// 	backgroundSize: 'auto, 40% 100%',
					// 	backgroundPosition: 'left top, right center',
					// 	backgroundRepeat: 'no-repeat, no-repeat',
					// }}
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
								{project.equipo.lider.nombre}
							</span>
							<span className='font-light text-sm text-[var(--children-font)]'>
								ID 189053
							</span>
						</div>
						<PriceChip price={String(project.costo)} />
					</CardHeader>
					<CardBody className='flex flex-row justify-between mb-auto '>
						<div className='hidden md:flex flex-col gap-1 text-[var(--children-font)] text-xs mt-auto'>
							<span className='flex items-center gap-1'>
								<GroupIcon h={15} color={colorIcons} />
								Conformado por {
									project.equipo.empleados.length
								}{' '}
								miembros
							</span>
							<span className='flex items-center gap-1'>
								<CalendarIcon h={15} color={colorIcons} />
								{new Date(
									project.calendario.fecha_inicio!.anno,
									project.calendario.fecha_inicio!.mes - 1,
									project.calendario.fecha_inicio!.dia
								).toLocaleDateString()}{' '}
								-{' '}
								{new Date(
									project.calendario.fecha_fin!.anno,
									project.calendario.fecha_fin!.mes - 1,
									project.calendario.fecha_fin!.dia
								).toLocaleDateString()}
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

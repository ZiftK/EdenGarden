'use client'

import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { useEffect } from 'react'
import { Employee, DateFormat } from '@/src/shared/types'
import { useEmployeeStore } from '@/src/features/Employees/model/employeeStore'
import Image from 'next/image'
import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import {
	InfoHouseIcon,
	UserIcon,
} from '@/src/components/ERP/moleculs/icons/iconst'
import ModalDeleteEmployee from '@/src/features/Employees/ui/atoms/ModalDeleteEmployee'
import Link from 'next/link'

const colorIcons = 'var(--children-font)'

const formatDate = (date: DateFormat | null) => {
	if (!date) return null
	return `${date.dia}/${date.mes}/${date.anno}`
}

export default function Page({ params }: { params: { empleado: string } }) {
	const { currentEmployee, getEmployeeById, isLoading } = useEmployeeStore()

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				await getEmployeeById(params.empleado)
			} catch (error) {
				console.error('Error fetching employee:', error)
			}
		}
		fetchEmployee()
	}, [getEmployeeById, params.empleado])

	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<span>Cargando empleado...</span>
			</div>
		)
	}

	if (!currentEmployee) {
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<span>No se encontró el empleado</span>
			</div>
		)
	}

	return (
		<section className='text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<Card className='bg-[var(--bg-card-obscure-200)]'>
				<CardHeader className='flex justify-between items-center'>
					<div className='flex gap-3'>
						<Image
							src={currentEmployee.img || '/placeholder.png'}
							alt={currentEmployee.nombre}
							width={100}
							height={100}
							className='rounded-full'
						/>
						<div className='flex flex-col'>
							<p className='text-xl font-bold'>
								{currentEmployee.nombre}
							</p>
							<p className='text-sm text-[var(--children-font)]'>
								{currentEmployee.puesto}
							</p>
						</div>
					</div>
					<div className='flex gap-2'>
						<Link
							href={`/dashboard/empleados/editar/${currentEmployee.id_empleado}`}
							className='text-blue-500 hover:text-blue-600'
						>
							Editar
						</Link>
						<ModalDeleteEmployee
							employeeId={currentEmployee.id_empleado.toString()}
							employeeName={currentEmployee.nombre}
						/>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div>
							<h3 className='text-xl font-bold mb-4 text-[var(--father-font)]'>
								Información Personal
							</h3>
							<div className='space-y-4 text-[var(--children-font)]'>
								<div className='flex items-center gap-2'>
									<EmailIcon h={15} color={colorIcons} />
									<span>{currentEmployee.email}</span>
								</div>
								<div className='flex items-center gap-2'>
									<PhoneIcon h={15} color={colorIcons} />
									<span>{currentEmployee.telefono}</span>
								</div>
								<div className='flex items-center gap-2'>
									<InfoHouseIcon h={15} color={colorIcons} />
									<span>{currentEmployee.direccion}</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className='text-xl font-bold mb-4 text-[var(--father-font)]'>
								Información Laboral
							</h3>
							<div className='space-y-4 text-[var(--children-font)]'>
								<p>
									<span className='font-semibold'>
										Puesto:
									</span>{' '}
									{currentEmployee.puesto}
								</p>
								<p>
									<span className='font-semibold'>Rol:</span>{' '}
									{currentEmployee.rol}
								</p>
								<p>
									<span className='font-semibold'>
										Salario:
									</span>{' '}
									$
									{typeof currentEmployee.salario === 'number'
										? currentEmployee.salario.toLocaleString(
												'es-MX',
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												}
											)
										: '0.00'}
								</p>
								<p>
									<span className='font-semibold'>
										Fecha de Contratación:
									</span>{' '}
									{formatDate(
										currentEmployee.fecha_contratacion
									)}
								</p>
								{currentEmployee.fecha_salida && (
									<p>
										<span className='font-semibold'>
											Fecha de Salida:
										</span>{' '}
										{formatDate(
											currentEmployee.fecha_salida
										)}
									</p>
								)}
								{currentEmployee.fecha_recontratacion && (
									<p>
										<span className='font-semibold'>
											Fecha de Recontratación:
										</span>{' '}
										{formatDate(
											currentEmployee.fecha_recontratacion
										)}
									</p>
								)}
							</div>
						</div>
					</div>
				</CardBody>
			</Card>
		</section>
	)
}

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

interface EmployeeDetailsProps {
	employeeId: string
}

export default function EmployeeDetails({ employeeId }: EmployeeDetailsProps) {
	const { currentEmployee, getEmployeeById, isLoading } = useEmployeeStore()

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				await getEmployeeById(employeeId)
			} catch (error) {
				console.error('Error fetching employee:', error)
			}
		}
		fetchEmployee()
	}, [getEmployeeById, employeeId])

	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<span>Cargando empleado...</span>
			</div>
		)
	}

	if (!currentEmployee || !currentEmployee.id_empleado) {
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<span>No se encontró el empleado</span>
			</div>
		)
	}

	return (
		<section className='z-[-1] text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<Card className='bg-[var(--bg-card-obscure-200)]'>
				<CardHeader>
					<div className='flex flex-col sm:flex-row sm:items-center w-full justify-between gap-4'>
						<div className='flex gap-3'>
							<Image
								src={currentEmployee.img || '/placeholder.png'}
								alt={currentEmployee.nombre || ''}
								width={100}
								height={100}
								className='rounded-full'
							/>
							<div className='flex flex-col justify-center'>
								<p className='text-xl font-bold text-[var(--father-font)]'>
									{currentEmployee.nombre}
								</p>
								<p className='text-md text-[var(--children-font)]'>
									{currentEmployee.puesto}
								</p>
							</div>
						</div>
						<div className='flex gap-2 items-center  ml-auto'>
							<Link
								href={`/dashboard/empleados/editar/${currentEmployee.id_empleado}`}
								className='bg-[var(--green-dark-500)] inline-flex items-center text-white text-sm px-3 h-7 hover:bg-[var(--green-dark-600)] transition-colors rounded-lg'
							>
								Editar
							</Link>
							<ModalDeleteEmployee
								employeeId={currentEmployee.id_empleado.toString()}
								employeeName={currentEmployee.nombre || ''}
							/>
						</div>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div>
							<h3 className='text-lg font-semibold mb-3 text-[var(--father-font)]'>
								Información Personal
							</h3>
							<div className='space-y-3 text-[var(--children-font)] text-sm'>
								<div className='flex items-center gap-2'>
									<EmailIcon h={15} color={colorIcons} />
									<span className='break-all'>
										{currentEmployee.email}
									</span>
								</div>
								<div className='flex items-center gap-2'>
									<PhoneIcon h={15} color={colorIcons} />
									<span>{currentEmployee.telefono}</span>
								</div>
								<div className='flex items-center gap-2'>
									<InfoHouseIcon h={15} color={colorIcons} />
									<span className='break-words'>
										{currentEmployee.direccion}
									</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className='text-lg font-semibold mb-3 text-[var(--father-font)]'>
								Información Laboral
							</h3>
							<div className='space-y-3 text-[var(--children-font)] text-sm'>
								<p>
									<span className='font-medium'>Puesto:</span>{' '}
									{currentEmployee.puesto}
								</p>
								<p>
									<span className='font-medium'>Rol:</span>{' '}
									{currentEmployee.rol}
								</p>
								<p>
									<span className='font-medium'>
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
									<span className='font-medium'>
										Fecha de Contratación:
									</span>{' '}
									{formatDate(
										currentEmployee.fecha_contratacion
									)}
								</p>
								{currentEmployee.fecha_salida && (
									<p>
										<span className='font-medium'>
											Fecha de Salida:
										</span>{' '}
										{formatDate(
											currentEmployee.fecha_salida
										)}
									</p>
								)}
								{currentEmployee.fecha_recontratacion && (
									<p>
										<span className='font-medium'>
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

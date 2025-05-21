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
	const {
		currentEmployee,
		isLoading,
		error,
		getEmployeeById,
		clearCurrentEmployee,
	} = useEmployeeStore()

	useEffect(() => {
		getEmployeeById(params.empleado)
		return () => {
			clearCurrentEmployee()
		}
	}, [params.empleado, getEmployeeById, clearCurrentEmployee])

	if (isLoading) return <div>Cargando...</div>
	if (error) return <div className='text-red-500'>{error}</div>
	if (!currentEmployee) return <div>Empleado no encontrado</div>

	return (
		<section className='h-full mt-4 text-[var(--father-font)] !row-start-2 !row-end-4 xl:col-start-2'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-bold'>Detalles del Empleado</h1>
				<div className='flex gap-2'>
					<Link
						href={`/dashboard/empleados/${currentEmployee.id_empleado}/editar`}
						className='bg-[var(--green-dark-500)] text-white px-4 py-2 rounded-lg hover:bg-[var(--green-dark-600)] transition-colors'
					>
						Editar
					</Link>
					<ModalDeleteEmployee
						employeeId={currentEmployee.id_empleado}
						employeeName={currentEmployee.nombre}
					/>
				</div>
			</div>

			<Card className='!relative z-0 overflow-hidden bg-[var(--bg-card-obscure)]'>
				<CardHeader className='flex gap-4'>
					<div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--green-dark-500)]'>
						<Image
							src={
								currentEmployee.img ||
								'https://i.pravatar.cc/150'
							}
							alt={currentEmployee.nombre}
							fill
							className='object-cover'
						/>
					</div>
					<div>
						<h2 className='text-2xl font-bold  text-[var(--father-font)]'>
							{currentEmployee.nombre}
						</h2>
						<p className='text-[var(--children-font)] text-lg'>
							{currentEmployee.puesto}
						</p>
						<p className='text-[var(--children-font)] text-sm mt-1'>
							ID: {currentEmployee.id_empleado}
						</p>
					</div>
				</CardHeader>

				<Divider />

				<CardBody>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div>
							<h3 className='text-xl font-bold mb-4  text-[var(--father-font)]'>
								Información Personal
							</h3>
							<div className='space-y-4 text-[var(--children-font)]'>
								<p className='flex items-center gap-3'>
									<UserIcon h={20} color={colorIcons} />
									{currentEmployee.nombre}
								</p>
								<p className='flex items-center gap-3'>
									<EmailIcon h={20} color={colorIcons} />
									{currentEmployee.email}
								</p>
								<p className='flex items-center gap-3'>
									<PhoneIcon h={20} color={colorIcons} />
									{currentEmployee.telefono}
								</p>
								<p className='flex items-center gap-3'>
									<InfoHouseIcon h={20} color={colorIcons} />
									{currentEmployee.direccion}
								</p>
							</div>
						</div>

						<div>
							<h3 className='text-xl font-bold mb-4  text-[var(--father-font)]'>
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
									{currentEmployee.salario.toLocaleString(
										'es-MX',
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										}
									)}
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

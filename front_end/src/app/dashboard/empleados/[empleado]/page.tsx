'use client'

import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import { useEffect, useState } from 'react'
import { Employee } from '@/src/shared/types'
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

export default function Page({ params }: { params: { empleado: string } }) {
	const [employee, setEmployee] = useState<Employee | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { getEmployeeById } = useEmployeeStore()

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				setLoading(true)
				setError(null)
				const data = await getEmployeeById(params.empleado)
				setEmployee(data)
			} catch (error) {
				console.error('Error al obtener el empleado:', error)
				setError('Error al cargar el empleado')
			} finally {
				setLoading(false)
			}
		}
		fetchEmployee()
	}, [params.empleado, getEmployeeById])

	if (loading) return <div>Cargando...</div>
	if (error) return <div className='text-red-500'>{error}</div>
	if (!employee) return <div>Empleado no encontrado</div>
	console.log(employee)
	return (
		<section className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<div className='flex justify-between items-center mb-4'>
				<h1 className='text-2xl font-bold'>Detalles del Empleado</h1>
				<div className='flex gap-2'>
					<Link
						href={`/dashboard/empleados/${employee.id_empleado}/editar`}
						className='bg-[var(--green-dark-500)] text-white px-4 py-2 rounded-lg'
					>
						Editar
					</Link>
					<ModalDeleteEmployee
						employeeId={employee.id_empleado}
						employeeName={employee.nombre}
					/>
				</div>
			</div>

			<Card className='bg-[var(--bg-card-obscure)]'>
				<CardHeader className='flex gap-4'>
					<div className='relative w-24 h-24 rounded-full overflow-hidden'>
						<Image
							src={
								employee.img_url || 'https://i.pravatar.cc/150'
							}
							alt={employee.nombre}
							fill
							className='object-cover'
						/>
					</div>
					<div>
						<h2 className='text-xl font-bold'>{employee.nombre}</h2>
						<p className='text-[var(--children-font)]'>
							{employee.puesto}
						</p>
						<p className='text-[var(--children-font)] text-sm'>
							ID: {employee.id_empleado}
						</p>
					</div>
				</CardHeader>

				<Divider />

				<CardBody>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
						<div>
							<h3 className='text-lg font-bold mb-4'>
								Información Personal
							</h3>
							<div className='space-y-3 text-[var(--children-font)]'>
								<p className='flex items-center gap-2'>
									<UserIcon h={15} color={colorIcons} />
									{employee.nombre}
								</p>
								<p className='flex items-center gap-2'>
									<EmailIcon h={15} color={colorIcons} />
									{employee.email}
								</p>
								<p className='flex items-center gap-2'>
									<PhoneIcon h={15} color={colorIcons} />
									{employee.telefono}
								</p>
								<p className='flex items-center gap-2'>
									<InfoHouseIcon h={15} color={colorIcons} />
									{employee.direccion}
								</p>
							</div>
						</div>

						<div>
							<h3 className='text-lg font-bold mb-4'>
								Información Laboral
							</h3>
							<div className='space-y-3 text-[var(--children-font)]'>
								<p>
									<span className='font-semibold'>
										Puesto:
									</span>{' '}
									{employee.puesto}
								</p>
								<p>
									<span className='font-semibold'>Rol:</span>{' '}
									{employee.rol}
								</p>
								<p>
									<span className='font-semibold'>
										Salario:
									</span>{' '}
									${employee.salario}
								</p>
								<p>
									<span className='font-semibold'>
										Fecha de Contratación:
									</span>{' '}
									{employee.fecha_contratacion}
								</p>
								{employee.fecha_salida && (
									<p>
										<span className='font-semibold'>
											Fecha de Salida:
										</span>{' '}
										{employee.fecha_salida}
									</p>
								)}
								{employee.fecha_recontratacion && (
									<p>
										<span className='font-semibold'>
											Fecha de Recontratación:
										</span>{' '}
										{employee.fecha_recontratacion}
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

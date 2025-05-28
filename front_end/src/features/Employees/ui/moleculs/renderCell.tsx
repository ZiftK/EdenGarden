import { Employee, DateFormat } from '@/src/shared/types'
import { User, Tooltip, Button } from '@heroui/react'
import { EditIcon, EyeIcon } from '@/src/features/Employees/ui/moleculs/Icons'
import ModalDeleteEmployee from '../atoms/ModalDeleteEmployee'
import Link from 'next/link'
import { ReactNode } from 'react'

const formatDate = (date: DateFormat | null): string => {
	if (!date) return ''
	return `${date.dia}/${date.mes}/${date.anno}`
}

export function renderCell(
	user: Employee,
	columnKey: keyof Employee | 'actions'
): ReactNode {
	const cellValue = user[columnKey as keyof Employee]

	switch (columnKey) {
		case 'id_empleado':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm'>
						{cellValue !== undefined && cellValue !== null
							? typeof cellValue === 'object'
								? JSON.stringify(cellValue)
								: String(cellValue)
							: ''}
					</p>
				</div>
			)
		case 'nombre':
			return (
				<User
					avatarProps={{ radius: 'lg', src: user.img }}
					description={user.email}
					name={cellValue as string}
				>
					{user.email}
				</User>
			)
		case 'rol':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize'>
						{cellValue !== undefined && cellValue !== null
							? typeof cellValue === 'object'
								? JSON.stringify(cellValue)
								: String(cellValue)
							: ''}
					</p>
				</div>
			)
		case 'fecha_contratacion':
		case 'fecha_salida':
		case 'fecha_recontratacion':
			return <span>{formatDate(cellValue as DateFormat | null)}</span>
		case 'actions':
			return (
				<div className='relative flex items-center gap-2 mx-auto justify-center'>
					<Tooltip content='Detalles' color='secondary'>
						<Link href={`/dashboard/empleados/${user.id_empleado}`}>
							<Button
								isIconOnly
								className='text-lg text-default-400 bg-[#0002] cursor-pointer active:opacity-50 rounded-full'
							>
								<EyeIcon />
							</Button>
						</Link>
					</Tooltip>
					<Tooltip content='Editar empleado' color='secondary'>
						<Link
							href={`/dashboard/empleados/${user.id_empleado}/editar`}
						>
							<Button
								isIconOnly
								className='text-lg text-default-400 bg-[#0002] cursor-pointer active:opacity-50 rounded-full'
							>
								<EditIcon />
							</Button>
						</Link>
					</Tooltip>

					<ModalDeleteEmployee
						employeeId={user.id_empleado.toString()}
						employeeName={user.nombre}
					/>
				</div>
			)
		default:
			if (cellValue === null || cellValue === undefined)
				return <span></span>
			if (typeof cellValue === 'object')
				return <span>{JSON.stringify(cellValue)}</span>
			return <span>{String(cellValue)}</span>
	}
}

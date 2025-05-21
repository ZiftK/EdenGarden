import { Employee } from '@/src/shared/types'
import { User, Tooltip, Button } from '@heroui/react'
import { EditIcon, EyeIcon } from '@/src/features/Employees/ui/moleculs/Icons'
import ModalDeleteEmployee from '../atoms/ModalDeleteEmployee'
import Link from 'next/link'

export function renderCell(
	user: Employee,
	columnKey: keyof Employee | 'actions'
) {
	const cellValue = user[columnKey as keyof Employee]

	switch (columnKey) {
		case 'nombre':
			return (
				<User
					avatarProps={{ radius: 'lg', src: user.img_url }}
					description={user.email}
					name={cellValue as string}
				>
					{user.email}
				</User>
			)
		case 'rol':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-sm capitalize'>{cellValue}</p>
				</div>
			)
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
						employeeId={user.id_empleado}
						employeeName={user.nombre}
					/>
				</div>
			)
		default:
			return cellValue
	}
}

import { Employee } from '@/src/shared/types'
import { User, Tooltip, Button } from '@heroui/react'
import {
	DeleteIcon,
	EditIcon,
	EyeIcon,
} from '@/src/features/Employees/ui/moleculs/Icons'

export function renderCell(
	user: Employee,
	columnKey: keyof Employee | 'actions'
) {
	const statusColorMap: Record<
		string,
		'success' | 'default' | 'primary' | 'secondary' | 'warning' | 'danger'
	> = {
		active: 'success',
		inactive: 'danger',
		pending: 'warning',
	}
	const cellValue = user[columnKey as keyof Employee]

	switch (columnKey) {
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
					<p className='text-bold text-sm capitalize'>{cellValue}</p>
				</div>
			)
		case 'actions':
			return (
				<div className='relative flex items-center gap-2 mx-auto justify-center'>
					<Tooltip content='Detalles' color='secondary'>
						<Button
							isIconOnly
							className='text-lg text-default-400 bg-[#0002] cursor-pointer active:opacity-50 rounded-full'
						>
							<EyeIcon />
						</Button>
					</Tooltip>
					<Tooltip content='Edit user' color='secondary'>
						<Button
							isIconOnly
							className='text-lg text-default-400 bg-[#0002] cursor-pointer active:opacity-50 rounded-full'
						>
							<EditIcon />
						</Button>
					</Tooltip>
					<Tooltip color='danger' content='Delete user'>
						<Button
							isIconOnly
							className='text-lg text-danger bg-[#0002] cursor-pointer active:opacity-50 rounded-full'
						>
							<DeleteIcon />
						</Button>
					</Tooltip>
				</div>
			)
		default:
			return cellValue
	}
}

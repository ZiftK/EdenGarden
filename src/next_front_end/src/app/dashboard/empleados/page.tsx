'use client'

import { getEmployees } from '@/src/features/Employees/model/getEmployees'
import {
	DeleteIcon,
	EditIcon,
	EyeIcon,
} from '@/src/features/Employees/ui/moleculs/Icons'
import Title from '@/src/shared/components/atoms/Title'
import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	User,
} from '@heroui/react'
import { useCallback } from 'react'

export default function Page() {
	const data = getEmployees()

	const columns = [
		{ uid: 'name', name: 'Nombre' },
		{ uid: 'role', name: 'Rol' },
		{ uid: 'status', name: 'Estado' },
		{ uid: 'actions', name: 'Acciones' },
	]

	const statusColorMap = {
		active: 'success',
		inactive: 'danger',
		pending: 'warning',
	}

	const renderCell = useCallback((user, columnKey) => {
		const cellValue = user[columnKey]

		switch (columnKey) {
			case 'name':
				return (
					<User
						avatarProps={{ radius: 'lg', src: user.img }}
						description={user.email}
						name={cellValue}
					>
						{user.email}
					</User>
				)
			case 'role':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize'>
							{cellValue}
						</p>
						<p className='text-bold text-sm capitalize text-default-400'>
							{user.team}
						</p>
					</div>
				)
			case 'status':
				return (
					<Chip
						className='capitalize'
						color={statusColorMap[user.status]}
						size='sm'
						variant='flat'
					>
						{cellValue}
					</Chip>
				)
			case 'actions':
				return (
					<div className='relative flex items-center gap-2'>
						<Tooltip content='Details'>
							<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
								<EyeIcon />
							</span>
						</Tooltip>
						<Tooltip content='Edit user'>
							<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color='danger' content='Delete user'>
							<span className='text-lg text-danger cursor-pointer active:opacity-50'>
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				)
			default:
				return cellValue
		}
	}, [])

	return (
		<section
			aria-labelledby='dashboard-section-title'
			className=' overflow-x-auto w-full lg:max-w-9/12 mt-4 text-[var(--father-font)] mx-auto col-start-1 md:row-start-2  md:!col-start-1 md:row-span-3 xl:!col-start-2'
		>
			<Title
				title='Empleados'
				btn={{ active: true, path: '/dashboard/equipos/crear' }}
			/>

			<Table
				aria-label='Example table with custom cells'
				className='max-h-[calc(100%-45px)] w-full [&>div]:!bg-transparent'
				border={10}
				color='success'
				classNames={{
					base: '!bg-transparent !font-normal !text-sm',
					table: 'bg-transparent !p-0 !border-0 ',
				}}
			>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={
								column.uid === 'actions' ? 'center' : 'start'
							}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={data} className='overflow-y-auto'>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</section>
	)
}

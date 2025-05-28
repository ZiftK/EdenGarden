import {
	EmailIcon,
	PhoneIcon,
	TrashIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import { TeamMemberRowProps } from '../../types/types'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { useTeamStore } from '@/src/features/Teams/model/teamStore'

export function TeamMemberRow({
	user,
	isEditing,

	onDelete,
}: TeamMemberRowProps & {
	onDelete?: () => void
	data?: unknown
}) {
	const { user: currentUser } = useAuthStore()
	const { deleteTeamMember } = useTeamStore()
	const isAdmin = currentUser?.rol === 'admin'

	const canManageTeam = isAdmin

	const handleDelete = async () => {
		if (!onDelete || !user.id_empleado) return
		if (
			!window.confirm(
				'¿Estás seguro de que deseas eliminar este miembro del equipo?'
			)
		)
			return

		try {
			await deleteTeamMember(user.fk_equipo!, user.id_empleado)
			onDelete()
		} catch (error) {
			console.error('Error al eliminar miembro:', error)
		}
	}

	return (
		<div
			className={`flex items-center gap-4 p-3 bg-transparent rounded-lg hover:bg-[var(--father-font-transparent-200)] transition-colors`}
		>
			<div className='w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0'>
				<Image
					src={user.img || 'https://via.placeholder.com/150'}
					alt={user.nombre}
					fill
					className='object-cover'
				/>
			</div>

			<div className='flex-1 min-w-0'>
				<div className='flex items-center gap-2'>
					<h4 className='text-[var(--father-font)] font-medium truncate'>
						{user.nombre}
					</h4>
				</div>
				<div className='flex items-center gap-4 mt-1'>
					<CopyButton
						text={user.email}
						icon={EmailIcon({
							color: 'var(--father-font)',
							h: 14,
						})}
					/>
					<CopyButton
						text={user.telefono}
						icon={PhoneIcon({
							color: 'var(--father-font)',
							h: 14,
						})}
					/>
				</div>
			</div>

			{!isEditing && (
				<span className='text-sm text-[var(--father-font-transparent-800)]'>
					{user.salario ? `$${user.salario}` : 'No definido'}
				</span>
			)}

			{canManageTeam && (
				<Button
					size='sm'
					color='danger'
					variant='light'
					onPress={handleDelete}
					className='!text-[var(--father-font)]'
				>
					Eliminar
					<TrashIcon color='var(--father-font)' h={14} />
				</Button>
			)}
		</div>
	)
}

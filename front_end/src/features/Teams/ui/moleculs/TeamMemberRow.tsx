import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import { TeamMemberRowProps } from '../../types/types'
import Image from 'next/image'

export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({
	user,
	index,
	isEditing,
	isIncluded,
	onToggle,
}) => {
	return (
		<div
			className={`flex items-center gap-4 p-3 ${
				index % 2 === 0
					? 'bg-transparent'
					: 'bg-[var(--father-font-transparent-100)]'
			} rounded-lg hover:bg-[var(--father-font-transparent-200)] transition-colors`}
		>
			{isEditing && (
				<input
					type='checkbox'
					checked={isIncluded}
					className='accent-[var(--father-font)] cursor-pointer'
					onChange={(e) => onToggle(e.target.checked)}
				/>
			)}

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
					<span className='text-sm text-[var(--father-font-transparent-800)] truncate'>
						{user.puesto}
					</span>
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
		</div>
	)
}

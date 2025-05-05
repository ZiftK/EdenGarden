import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import { TeamMemberRowProps } from '../../types/types'

export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({
	user,
	index,
	isEditing,
	isIncluded,
	onToggle,
}) => {
	return (
		<div
			className={`grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center text-center py-2 ${
				index % 2 === 0
					? 'bg-transparent'
					: 'bg-[var(--father-font-transparent-200)]'
			}`}
		>
			<div className='col-span-3 w-full grid grid-cols-[1fr_1fr_2fr]'>
				<span className='text-sm'>{user.position}</span>
				<span className='text-sm'>{user.id}</span>
				<span className='text-sm'>{user.name}</span>
			</div>

			<div className='flex items-center justify-center gap-2'>
				<CopyButton
					text={user.email}
					icon={EmailIcon({
						color: 'var(--father-font)',
						size: [0.75, 0.75],
					})}
				/>
				<CopyButton
					text={user.phone_number}
					icon={PhoneIcon({
						color: 'var(--father-font)',
						size: [0.75, 0.75],
					})}
				/>
			</div>

			{isEditing ? (
				<input
					type='checkbox'
					checked={isIncluded}
					className='accent-[var(--father-font)] cursor-pointer'
					onChange={(e) => onToggle(e.target.checked)}
				/>
			) : (
				<span className='text-sm'>{user.salary}</span>
			)}
		</div>
	)
}

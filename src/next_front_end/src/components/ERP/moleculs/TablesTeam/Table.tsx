import { ShortTeam } from '@/src/shared/types'
import CopyButton from '../../atoms/CopyButton'
import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'

export default function TableTeams({ team }: { team: ShortTeam }) {
	return (
		<div className='w-full font-light text-sm overflow-y-auto'>
			{/* Header */}
			<div className='grid grid-cols-[1fr_1fr_2fr_1fr] bg-transparent text-center py-2 mb-2 font-medium border-b border-[#bec8a6]'>
				<span className='text-xs'>Puesto</span>
				<span className='text-xs'>Expediente</span>
				<span className='text-xs'>Nombre</span>
				<span className='text-xs'>Contacto</span>
			</div>

			{/*Leader*/}
			<div className='grid grid-cols-[1fr_1fr_2fr_1fr] items-center text-center py-2 bg-[var(--father-font-transparent-200)]'>
				<span>{team.leader.position}</span>
				<span>{team.leader.id}</span>
				<span>{team.leader.name}</span>

				<div className='flex items-center justify-center gap-2'>
					<CopyButton
						text={team.leader.email}
						icon={EmailIcon({
							color: 'var(--father-font)',
							size: [0.75, 0.75],
						})}
					/>
					<CopyButton
						text={team.leader.phone_number}
						icon={PhoneIcon({
							color: 'var(--father-font)',
							size: [0.75, 0.75],
						})}
					/>
				</div>
			</div>

			{/* Body */}
			<div className='divide-y divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:overflow-y-auto xl:h-48'>
				{team.members.map((usuario, i) => (
					<div
						key={i}
						className={`grid grid-cols-[1fr_1fr_2fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
					>
						<span>{usuario.position}</span>
						<span>{usuario.id}</span>
						<span>{usuario.name}</span>

						<div className='flex items-center justify-center gap-2'>
							<CopyButton
								text={usuario.email}
								icon={EmailIcon({
									color: 'var(--father-font)',
									size: [0.75, 0.75],
								})}
							/>
							<CopyButton
								text={usuario.phone_number}
								icon={PhoneIcon({
									color: 'var(--father-font)',
									size: [0.75, 0.75],
								})}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

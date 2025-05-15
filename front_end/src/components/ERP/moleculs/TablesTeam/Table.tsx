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
				<span className='text-xs'>{team?.lider.puesto}</span>
				<span className='text-xs'>{team?.lider.id_empleado}</span>
				<span className='text-xs'>{team?.lider.nombre}</span>

				<div className='flex items-center justify-center gap-2'>
					<CopyButton
						text={team?.lider.email}
						icon={EmailIcon({
							color: 'var(--father-font)',
							h: 12,
						})}
					/>
					<CopyButton
						text={team?.lider.telefono}
						icon={PhoneIcon({
							color: 'var(--father-font)',
							h: 12,
						})}
					/>
				</div>
			</div>

			{/* Body */}
			<div className='divide-y divide-[#2b2f22] h-[100px] overflow-y-scroll  text-xs scrollbar-thin-custom xl:max-h-48'>
				{team?.empleados.map((usuario, i) => (
					<div
						key={i}
						className={`grid grid-cols-[1fr_1fr_2fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
					>
						<span>{usuario.puesto}</span>
						<span>{usuario.id_empleado}</span>
						<span>{usuario.nombre}</span>

						<div className='flex items-center justify-center gap-2'>
							<CopyButton
								text={usuario.email}
								icon={EmailIcon({
									color: 'var(--father-font)',
									h: 12,
								})}
							/>
							<CopyButton
								text={usuario.telefono}
								icon={PhoneIcon({
									color: 'var(--father-font)',
									h: 12,
								})}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

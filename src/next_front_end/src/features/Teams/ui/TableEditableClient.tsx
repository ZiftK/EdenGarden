'use client'

import { useEditableTeam } from '../model/useTeamEditable'
import { ShortTeam } from '@/src/shared/types'
import { TeamMemberRow } from './moleculs/TeamMemberRow'
import LeaderAutocomplete from '../../Employees/ui/moleculs/LeadereAutocomplete'
import { toggleTeamMember } from '../model/handlers/toogleTeamMember'
import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import ModalNewMember from './moleculs/ModalNewMember'

export default function TableEditableClient({ team }: { team: ShortTeam }) {
	const {
		data,
		setData,
		bottomRef,
		reset,
		handleSave,
		handleToggleRemove,
		handleAddMember,
	} = useEditableTeam(team)

	const currentLeader = data?.currentTeam?.leader

	return (
		<>
			{/* Header y resto del código como estaba */}
			<div className='w-full font-light text-sm overflow-x-auto'>
				{/* Header */}
				<div className='grid grid-cols-[1fr_1fr_2fr_1fr_1fr] min-w-[450px] bg-transparent text-center py-2 mb-2 font-medium border-b border-[#bec8a6]'>
					<span className='text-sm'>Puesto</span>
					<span className='text-sm'>Expediente</span>
					<span className='text-sm'>Nombre</span>
					<span className='text-sm'>Contacto</span>
					{data.isEditing ? (
						<button
							onClick={() => handleToggleRemove()}
							className='text-sm text-blue-500 cursor-pointer border-b-2 w-fit m-auto'
						>
							Eliminar
						</button>
					) : (
						<span className='text-sm'>Salario</span>
					)}
				</div>

				{/*Leader*/}
				{data.currentTeam?.leader && (
					<div className='grid grid-cols-[1fr_1fr_2fr_1fr_1fr] min-w-[450px] items-center text-center py-2 bg-[var(--father-font-transparent-200)]'>
						<span>{currentLeader.position}</span>
						<span>{currentLeader.id}</span>

						{data.isEditing ? (
							<LeaderAutocomplete
								value={String(currentLeader.id)}
								onChange={(leader) => {
									setData((prev) => ({
										...prev,
										teamShowed: {
											...prev.teamShowed,
											leader: {
												...prev.teamShowed.leader,
												name: leader.name,
												id: leader.id,
											},
										},
									}))
								}}
							/>
						) : (
							<span>{currentLeader.name}</span>
						)}

						<div className='flex items-center justify-center gap-2'>
							<CopyButton
								text={currentLeader.email}
								icon={EmailIcon({
									color: 'var(--father-font)',
									size: [0.75, 0.75],
								})}
							/>
							<CopyButton
								text={currentLeader.phone_number}
								icon={PhoneIcon({
									color: 'var(--father-font)',
									size: [0.75, 0.75],
								})}
							/>
						</div>

						<span>{currentLeader.salary}</span>
					</div>
				)}

				{/* Body */}
				<div
					className='divide-y min-w-[450px] divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48'
					ref={bottomRef}
				>
					{data.teamShowed.members.map((user, i) => (
						<TeamMemberRow
							key={i}
							user={user}
							index={i}
							isEditing={data.isEditing}
							isIncluded={
								data.teamChanged?.members.includes(user) ||
								false
							}
							onToggle={(checked) => {
								setData((prev) =>
									toggleTeamMember(prev, user, checked)
								)
							}}
						/>
					))}
					{data.isEditing && <ModalNewMember />}
				</div>
			</div>

			{/* Botones de acción */}
			{!data.isEditing ? (
				<button
					onClick={() => setData({ ...data, isEditing: true })}
					className='cursor-pointer text-[var(--green-dark-500)] border-b-2 text-md place-self-end text-center'
				>
					Editar
				</button>
			) : (
				<div className='flex gap-2 justify-end mt-4'>
					<button
						onClick={handleSave}
						className='cursor-pointer text-md'
					>
						Guardar
					</button>
					<button onClick={reset} className='cursor-pointer text-md'>
						Cancelar
					</button>
				</div>
			)}
		</>
	)
}

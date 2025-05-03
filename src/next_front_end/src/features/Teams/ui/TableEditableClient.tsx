'use client'

import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import { ShortTeam } from '@/src/shared/types'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import { useEditableTeam } from '../model/useTeamEditable'
import LeaderAutocomplete from '../../Employees/ui/moleculs/LeadereAutocomplete'

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

	return (
		<>
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

				{/* Body */}
				<div
					className='divide-y min-w-[450px] divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48'
					ref={bottomRef}
				>
					{data.teamShowed.members.map((user, i) => (
						<div
							key={i}
							className={`grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--father-font-transparent-200)]'}`}
						>
							<div className='col-span-3 w-full grid grid-cols-[1fr_1fr_2fr]'>
								{user.role === 'leader' && data.isEditing ? (
									<LeaderAutocomplete
										value={data.currentTeam.leaderName.id}
										onChange={(leader) => {
											const newTeam =
												data.teamChanged || []
											setData((prev) => ({
												...prev,
												teamShowed: {
													...prev.teamShowed,
													leaderName: {
														id: leader.id,
														name: leader.name,
													},
												},
												teamChanged: {
													leaderName: {
														...prev.teamChanged
															?.leaderName,
														id: leader.id,
														name: leader.name,
													},
												},
											}))
										}}
									/>
								) : (
									<>
										<span className='text-sm'>
											{user.position}{' '}
										</span>
										<span className='text-sm'>
											{user.id}
										</span>
										<span className='text-sm'>
											{user.name}
										</span>
									</>
								)}
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

							{data.isEditing && user.role !== 'leader' ? (
								<input
									type='checkbox'
									checked={data.teamChanged!.includes(user)}
									className='accent-[var(--father-font)] cursor-pointer'
									onChange={(e) => {
										const checked = e.target.checked
										const newTeam = data.teamChanged || []

										setData({
											...data,
											teamChanged: checked
												? [...newTeam, user]
												: newTeam.filter(
														(u) => u !== user
													),
										})
									}}
								/>
							) : (
								<span className='text-sm'>{user.salary}</span>
							)}
						</div>
					))}
					{data.isEditing && (
						<button
							onClick={handleAddMember}
							className='w-full py-4 text-sm h-[20px] cursor-pointer '
						>
							Agregar +
						</button>
					)}
				</div>
			</div>

			{!data.isEditing && (
				<button
					onClick={() => setData({ ...data, isEditing: true })}
					className='cursor-pointer text-[var(--green-dark-500)] border-b-2 text-md place-self-end text-center'
				>
					Editar
				</button>
			)}

			{data.isEditing && (
				<div className='flex gap-2 justify-end mt-4'>
					<button
						onClick={handleSave}
						className='cursor-pointer text-md'
					>
						Guardar
					</button>
					<button
						onClick={() => reset()}
						className='cursor-pointer text-md'
					>
						Cancelar
					</button>
				</div>
			)}
		</>
	)
}

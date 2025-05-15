'use client'

import { useEditableTeam } from '../model/useTeamEditable'
import { ShortTeam } from '@/src/shared/types'
import { TeamMemberRow } from './moleculs/TeamMemberRow'
import LeaderAutocomplete from '../../Employees/ui/moleculs/LeadereAutocomplete'
import { toggleTeamMember } from '../handlers/toogleTeamMember'
import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import ModalNewMember from './moleculs/ModalNewMember'
import { Button } from '@heroui/react'

export default function TableEditableClient({
	team,
	isNewTeam = false,
}: {
	team: ShortTeam
	isNewTeam?: boolean
}) {
	const { data, setData, reset, handleSave, handleToggleRemove } =
		useEditableTeam({ initialTeam: team, isNewTeam })

	const currentLeader = data?.currentTeam?.lider

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
							className='text-sm text-blue-400 cursor-pointer border-b-2 w-fit m-auto'
						>
							Eliminar
						</button>
					) : (
						<span className='text-sm'>Salario</span>
					)}
				</div>

				{/*Leader*/}
				{data.currentTeam?.lider && (
					<div className='grid grid-cols-[1fr_1fr_2fr_1fr_1fr] min-w-[450px] items-center text-center py-2 bg-[var(--father-font-transparent-200)]'>
						<span>{currentLeader.puesto}</span>
						<span>{currentLeader.id_empleado}</span>

						{data.isEditing ? (
							<LeaderAutocomplete
								value={String(
									data.teamChanged!.lider?.id_empleado ||
										currentLeader.id_empleado
								)}
								onChange={(leader) => {
									setData((prev) => ({
										...prev,
										teamShowed: {
											...prev.teamShowed,
											leader: {
												...prev.teamShowed.lider,
												name: leader.nombre,
												id: leader.id_empleado,
											},
										},
										teamChanged: {
											...prev.teamChanged!,
											leader: {
												...prev.teamChanged!.lider,
												name: leader.nombre,
												id: leader.id_empleado,
											},
										},
									}))
								}}
							/>
						) : (
							<>
								<span>{currentLeader.nombre}</span>

								<div className='flex items-center justify-center gap-2'>
									<CopyButton
										text={currentLeader.email}
										icon={EmailIcon({
											color: 'var(--father-font)',
											h: 12,
										})}
									/>
									<CopyButton
										text={currentLeader.telefono}
										icon={PhoneIcon({
											color: 'var(--father-font)',
											h: 12,
										})}
									/>
								</div>

								<span>{currentLeader.salario}</span>
							</>
						)}
					</div>
				)}

				{/* Body */}
				<div className='divide-y min-w-[450px] divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48'>
					{data.teamShowed?.empleados.map((user, i) => (
						<TeamMemberRow
							key={i}
							user={user}
							index={i}
							isEditing={data.isEditing}
							isIncluded={
								data.teamChanged?.empleados.includes(user) ||
								false
							}
							onToggle={(checked) => {
								setData((prev) => {
									const updatedData = toggleTeamMember(
										prev,
										user,
										checked
									)
									return updatedData
								})
							}}
						/>
					))}
					{(data.isEditing || isNewTeam) && (
						<ModalNewMember
							onChange={(employee) => {
								setData((prev) => ({
									...prev,
									teamShowed: {
										...prev.teamShowed,
										members: [
											...prev.teamShowed?.empleados,
											...(Array.isArray(employee)
												? employee
												: [employee]),
										],
									},
									teamChanged: {
										...prev.teamChanged!,
										members: [
											...prev.teamChanged!.empleados,
											...(Array.isArray(employee)
												? employee
												: [employee]),
										],
									},
								}))
							}}
						/>
					)}
				</div>
			</div>

			{/* Botones de acción */}
			{!isNewTeam ? (
				!data.isEditing ? (
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
						<button
							onClick={() => {
								reset()
								setData((prev) => ({
									...prev,
									isEditing: false,
								}))
							}}
							className='cursor-pointer text-md'
						>
							Cancelar
						</button>
					</div>
				)
			) : (
				<Button
					className='bg-[var(--green-dark-500)] text-white mr-auto'
					onPress={handleSave}
					size='sm'
				>
					Crear nuevo equipo
				</Button>
			)}
		</>
	)
}

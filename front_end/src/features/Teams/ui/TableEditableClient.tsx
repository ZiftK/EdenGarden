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
import { Button, Input } from '@heroui/react'
import Image from 'next/image'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { fetcher } from '@/src/shared/api/httpClient'

export default function TableEditableClient({
	team,
	isNewTeam = false,
}: {
	team: ShortTeam
	isNewTeam?: boolean
}) {
	const { data, setData, reset, handleSave, handleToggleRemove } =
		useEditableTeam({ initialTeam: team, isNewTeam })
	const { user } = useAuthStore()
	const isAdmin = user?.rol === 'admin'

	const currentLeader = data?.currentTeam?.lider
	const displayedLeader = data.isEditing
		? data.teamChanged?.lider
		: currentLeader

	const handleDeleteMember = (memberId: number) => {
		if (!data.teamChanged) return

		setData((prev) => ({
			...prev,
			teamShowed: {
				...prev.teamShowed,
				empleados: prev.teamShowed.empleados.filter(
					(emp) => emp.id_empleado !== memberId
				),
			},
			teamChanged: {
				...prev.teamChanged!,
				empleados: prev.teamChanged!.empleados.filter(
					(emp) => emp.id_empleado !== memberId
				),
			},
		}))
	}

	const handleDeleteTeam = async () => {
		try {
			await fetcher.delete(`/team/delete/${team.id_equipo}`)
			// Redirect to teams list or handle success
			window.location.href = '/teams'
		} catch (error) {
			console.error('Error al eliminar el equipo:', error)
		}
	}

	return (
		<div className='space-y-6 w-full'>
			{/* Título del equipo */}
			<div className='flex items-center justify-between'>
				{data.isEditing ? (
					<Input
						value={data.teamChanged?.nombre || ''}
						onChange={(e) => {
							if (!data.teamChanged) return
							setData((prev) => ({
								...prev,
								teamChanged: {
									...prev.teamChanged!,
									nombre: e.target.value,
								},
							}))
						}}
						placeholder='Nombre del equipo'
						className='text-2xl font-bold !text-[var(--father-font)] !bg-transparent'
						variant='underlined'
					/>
				) : (
					<div className='flex items-center justify-between w-full'>
						<h2 className='text-2xl font-bold text-[var(--father-font)]'>
							{data.currentTeam.nombre}
						</h2>
						<div className='flex gap-2'>
							{isAdmin && !isNewTeam && !data.isEditing && (
								<>
									<Button
										onPress={() =>
											setData({
												...data,
												isEditing: true,
											})
										}
										className='cursor-pointer text-[var(--green-dark-500)] bg-transparent text-md'
									>
										Editar
									</Button>
									<Button
										color='danger'
										variant='light'
										onPress={handleDeleteTeam}
										className='!text-[var(--father-font)]'
									>
										Eliminar Equipo
									</Button>
								</>
							)}
						</div>
					</div>
				)}
			</div>

			{/* Líder del equipo */}
			<div className='bg-[var(--father-font-transparent-200)] p-4 rounded-lg'>
				<h3 className='text-lg font-semibold mb-4 text-[var(--father-font)]'>
					Líder del Equipo
				</h3>
				<div className='flex items-center gap-6'>
					<div className='w-16 h-16 relative rounded-full overflow-hidden'>
						<Image
							src={
								displayedLeader?.img ||
								'https://via.placeholder.com/150'
							}
							alt={displayedLeader?.nombre || 'Líder'}
							fill
							className='object-cover'
						/>
					</div>
					<div className='flex-1 space-y-2'>
						{data.isEditing ? (
							<LeaderAutocomplete
								value={String(displayedLeader?.id_empleado)}
								onChange={(leader) => {
									if (!data.teamChanged) return
									setData((prev) => ({
										...prev,
										teamChanged: {
											...prev.teamChanged!,
											lider: {
												nombre: leader.nombre,
												id_empleado: leader.id_empleado,
												email: leader.email,
												telefono: leader.telefono,
												rol: leader.rol,
												puesto: leader.puesto || '',
												salario: leader.salario || 0,
												img: leader.img,
											},
										},
									}))
								}}
							/>
						) : (
							<>
								<p className='text-lg font-medium text-[var(--father-font)]'>
									{displayedLeader?.nombre}
								</p>
								<p className='text-sm text-[var(--father-font-transparent-800)]'>
									{displayedLeader?.puesto}
								</p>
								<div className='flex items-center gap-4'>
									<CopyButton
										text={displayedLeader?.email || ''}
										icon={EmailIcon({
											color: 'var(--father-font)',
											h: 16,
										})}
									/>
									<CopyButton
										text={displayedLeader?.telefono || ''}
										icon={PhoneIcon({
											color: 'var(--father-font)',
											h: 16,
										})}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Miembros del equipo */}
			<div className='bg-[var(--father-font-transparent-200)] p-4 rounded-lg'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-semibold text-[var(--father-font)]'>
						Miembros del Equipo
					</h3>
					{data.isEditing && (
						<button
							onClick={handleToggleRemove}
							className='text-sm text-blue-400 cursor-pointer border-b-2'
						>
							Eliminar
						</button>
					)}
				</div>
				<div className='space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin-custom'>
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
							onDelete={
								user.id_empleado
									? () =>
											handleDeleteMember(
												user.id_empleado!
											)
									: undefined
							}
						/>
					))}
					{(data.isEditing || isNewTeam) && (
						<ModalNewMember
							onChange={(employee) => {
								if (!data.teamChanged) return
								setData((prev) => ({
									...prev,
									teamShowed: {
										...prev.teamShowed,
										empleados: [
											...prev.teamShowed?.empleados,
											...(Array.isArray(employee)
												? employee
												: [employee]),
										],
									},
									teamChanged: {
										...prev.teamChanged!,
										empleados: [
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
			{(data.isEditing || isNewTeam) && (
				<div className='flex gap-4 justify-end'>
					<Button
						color='danger'
						variant='light'
						onPress={() => {
							reset()
							setData((prev) => ({
								...prev,
								isEditing: false,
							}))
						}}
						className='!text-[var(--father-font)]'
					>
						Cancelar
					</Button>
					<Button
						color='primary'
						onPress={handleSave}
						className='!bg-[var(--green-dark-500)] !text-white'
					>
						{isNewTeam ? 'Crear Equipo' : 'Guardar Cambios'}
					</Button>
				</div>
			)}
		</div>
	)
}

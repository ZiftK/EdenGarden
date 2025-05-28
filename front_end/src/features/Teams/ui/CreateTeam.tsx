'use client'

import { Button, Input } from '@heroui/react'
import { ShortTeam } from '@/src/shared/types'
import { TeamMemberRow } from './moleculs/TeamMemberRow'
import { useEditableTeam } from '../model/useTeamEditable'
import LeaderAutocomplete from '../../Employees/ui/moleculs/LeadereAutocomplete'
import CopyButton from '@/src/components/ERP/atoms/CopyButton'
import {
	EmailIcon,
	PhoneIcon,
} from '@/src/components/landing/atoms/Icons/Icons'
import { toggleTeamMember } from '../handlers/toogleTeamMember'
import ModalNewMember from './moleculs/ModalNewMember'
import { redirect } from 'next/navigation'

export default function CreateTeam({}) {
	const initialTeam: ShortTeam = {
		nombre: '',
		id_equipo: 0,
		lider: {
			nombre: '',
			email: '',
			telefono: '',
			rol: 'lider',
			puesto: '',
			salario: 0,
			id_empleado: 0
		},
		empleados: [],
	}

	const { data, setData, reset, handleSave, handleToggleRemove } =
		useEditableTeam({ initialTeam, isNewTeam: true })

	const handleCreateNewTeam = () => {
		if (data.teamChanged?.empleados.length === 0) return
		if (data.teamChanged?.nombre === '') {
			alert('El nombre del equipo no puede estar vacio')
			return
		}
		if (!data.teamChanged?.lider.id_empleado) {
			alert('El lider no puede estar vacio')
			return
		}
		handleSave()
		redirect(`/dashboard/equipos/${data.currentTeam.nombre}`)
	}

	return (
		<article className='mt-10'>
			<Input
				isRequired
				errorMessage='EL nombre del equipo es invalido'
				label='Nombre del Equipo'
				labelPlacement='inside'
				name='TeamName'
				placeholder='Ingresa el nombre del equipo'
				type='text'
				classNames={{
					label: '!text-white/50',
					input: 'label:!text-[var(--father-font)] bg-transparent !text-[var(--father-font)] focus:!bg-white/30 active:!bg-white/30',
					inputWrapper: [
						'bg-transparent',
						'hover:!bg-white/30',
						'!data-[focused=true]:bg-transparent',
						'data-[hover=true]:!bg-white/30',
						'focus-within:!bg-transparent',
						'focus:!bg-transparent',
						'active:!bg-transparent',
						'focus:border-white/50',
					],
				}}
				onChange={(e) => {
					setData((prev) => ({
						...prev,
						isEditing: true,
						teamChanged: {
							...prev.teamChanged!,
							name: e.target.value,
							leader: prev.teamChanged?.lider || {
								id: '',
								name: '',
								role: 'lider',
								email: '',
								phone_number: '',
								position: '',
								salary: 0,
								teams: undefined,
							},
						},
					}))
				}}
			/>

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
						<span>{data.currentTeam.lider.puesto}</span>
						<span>{data.currentTeam.lider.id_empleado}</span>

						{data.isEditing ? (
							<LeaderAutocomplete
								value={String(
									data.currentTeam.lider.id_empleado
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
												...prev.teamChanged?.lider,
												name: leader.nombre,
												id: leader.id_empleado,
												email: leader.email,
												phone_number: leader.telefono,
												role: leader.rol,
												position: leader.puesto,
												salary: leader.salario,
												teams: data.teamChanged?.nombre,
											},
										},
									}))
								}}
							/>
						) : (
							<>
								<span>{data.currentTeam.lider.nombre}</span>

								<div className='flex items-center justify-center gap-2 bg-amber-50'>
									<CopyButton
										text={data.currentTeam.lider.email}
										icon={EmailIcon({
											color: 'var(--father-font)',
											h: 12,
										})}
									/>
									<CopyButton
										text={data.currentTeam.lider.telefono}
										icon={PhoneIcon({
											color: 'var(--father-font)',
											h: 10,
										})}
									/>
								</div>

								<span>{data.currentTeam.lider.salario}</span>
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
								setData((prev) =>
									toggleTeamMember(prev, user, checked)
								)
							}}
						/>
					))}
					{data.isEditing && (
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
			{data.isEditing && (
				<div className='flex flex-row-reverse ml-auto w-fit items-end gap-2'>
					<Button
						className='bg-[var(--green-dark-500)] text-white mr-auto'
						onPress={() => handleCreateNewTeam()}
						size='sm'
					>
						Crear nuevo equipo
					</Button>

					<Button
						className='bg-gray-600 text-white mr-auto'
						onPress={reset}
						size='sm'
					>
						Formatear
					</Button>
				</div>
			)}
		</article>
	)
}

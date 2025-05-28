import { Card, CardHeader, CardBody, Button } from '@heroui/react'
import { ShortTeam } from '@/src/shared/types'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'

interface TeamCardProps {
	team: ShortTeam
	onEdit: (team: ShortTeam) => void
	onDelete: (teamId: number) => void
	onDeleteMember?: (teamId: number, memberId: number) => void
}

export function TeamCard({
	team,
	onEdit,
	onDelete,
	onDeleteMember,
}: TeamCardProps) {
	const { user } = useAuthStore()
	const isAdmin = user?.rol === 'admin'
	const isLeader = user?.rol === 'lider'
	const isTeamLeader =
		isLeader && user?.id_empleado === team.lider.id_empleado
	const canManageTeam = isAdmin || isTeamLeader

	const handleDeleteMember = (
		teamId: number,
		memberId: number | undefined
	) => {
		if (memberId && onDeleteMember) {
			onDeleteMember(teamId, memberId)
		}
	}

	return (
		<Card className='w-full bg-[var(--bg-card-obscure)]'>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<h3 className='text-lg font-bold'>{team.nombre}</h3>
					{canManageTeam && (
						<div className='flex gap-2'>
							<Button
								size='sm'
								color='primary'
								onPress={() => onEdit(team)}
							>
								Editar
							</Button>
							<Button
								size='sm'
								color='danger'
								onPress={() => onDelete(team.id_equipo)}
							>
								Eliminar
							</Button>
						</div>
					)}
				</div>
			</CardHeader>
			<CardBody>
				<div className='flex flex-col gap-4'>
					<div>
						<p className='font-semibold'>Líder:</p>
						<p>
							{team.lider.nombre} - {team.lider.puesto}
						</p>
					</div>
					<div>
						<p className='font-semibold'>Miembros:</p>
						<ul className='list-disc list-inside'>
							{team.empleados.map((member) => (
								<li
									key={member.id_empleado}
									className='flex items-center justify-between py-1'
								>
									<span>
										{member.nombre} - {member.puesto}
									</span>
									{canManageTeam && onDeleteMember && (
										<Button
											size='sm'
											color='danger'
											variant='light'
											onClick={() =>
												handleDeleteMember(
													team.id_equipo,
													member.id_empleado
												)
											}
										>
											Eliminar
										</Button>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

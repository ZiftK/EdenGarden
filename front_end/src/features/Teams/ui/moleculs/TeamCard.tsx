import { Card, CardHeader, CardBody, Button } from '@heroui/react'
import { Team, Employee } from '@/src/shared/types'
import { useAuth } from '@/src/features/Auth/hooks/useAuth'

interface TeamCardProps {
	team: Team & {
		lider: Employee
		miembros: Employee[]
	}
	onEdit: (team: Team & { lider: Employee; miembros: Employee[] }) => void
	onDelete: (teamId: number) => void
}

export function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
	const { user } = useAuth()
	const isAdmin = user?.rol === 'admin'
	const isLeader = user?.rol === 'lider'
	const isTeamLeader =
		isLeader && user?.id_empleado === team.lider.id_empleado

	return (
		<Card className='w-full bg-[var(--bg-card-obscure)]'>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<h3 className='text-lg font-bold'>{team.nombre}</h3>
					{(isAdmin || isTeamLeader) && (
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
							{team.miembros.map((member: Employee) => (
								<li key={member.id_empleado}>
									{member.nombre} - {member.puesto}
								</li>
							))}
						</ul>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

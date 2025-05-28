import { Project } from '@/src/features/Projets/types'
import ShowProject from '@/src/features/Projets/ui/ShowProject'

import { TeamPageClient } from '@/src/features/Teams/ui/TeamPageClient'
import { ShortTeam } from '@/src/shared/types'
import { Card, CardBody, CardHeader } from '@heroui/react'

export default function ViewInitialNoAdmin({
	team,
	project,
}: {
	team: ShortTeam
	project: Project
}) {
	if (!team && !project) return null

	return (
		<div className='w-full flex flex-col gap-10 xl:col-span-2'>
			<ShowProject project={project} />

			<Card className='bg-[var(--bg-card-obscure)] w-full'>
				<CardHeader>
					<h3 className='text-lg font-bold'>Mi Equipo</h3>
				</CardHeader>
				<CardBody>{team && <TeamPageClient team={team} />}</CardBody>
			</Card>
		</div>
	)
}

import { getTeamById } from '@/src/features/Teams/api/getTeamById'
import { TeamPageClient } from '@/src/features/Teams/ui/TeamPageClient'
interface PageProps {
	params: Promise<{ team: string }>
}

export default async function TeamPage({ params }: PageProps) {
	const { team: teamId } = await params
	if (!teamId) return null

	const teamData = await getTeamById(teamId)

	return <TeamPageClient team={await teamData} />
}

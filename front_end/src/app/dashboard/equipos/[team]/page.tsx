import { getTeamById } from '@/src/features/Teams/api/getTeamById'
import { TeamPageClient } from '@/src/features/Teams/ui/TeamPageClient'

export default async function TeamPage({
  params,
}: {
  params: { team: string }
}) {
	const teamId = params.team;
  if (!teamId) return null
  
  const teamData = await getTeamById(teamId);

  return <TeamPageClient team={ await teamData} />
}
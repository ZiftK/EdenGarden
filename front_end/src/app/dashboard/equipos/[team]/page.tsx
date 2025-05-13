import TableEditableClient from '@/src/features/Teams/ui/TableEditableClient'
import { getTeams } from '@/src/features/Teams/api/getTeams'
import Link from 'next/link'

export default async function TeamPage({
	params,
}: {
	params: { team: string }
}) {
	const teams = await getTeams()
	const team = teams.find(
		(item) => item.name === decodeURIComponent(params.team)
	)
	if (!team) return null

	return (
		<section className='w-full flex flex-col mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<Link href={'./'} className='text-[var(--green-dark-500)]'>
					Equipos
				</Link>{' '}
				/ {decodeURIComponent(team!.name)}
			</h2>

			<h3 className='text-lg font-bold'>Distribucion del equipo</h3>

			<TableEditableClient team={team} />
		</section>
	)
}

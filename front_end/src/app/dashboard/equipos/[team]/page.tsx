import TableEditableClient from '@/src/features/Teams/ui/TableEditableClient'
import Link from 'next/link'
import { getTeamById } from '@/src/features/Teams/api/getTeamById'

export default async function TeamPage({
	params,
}: {
	params: { team: string }
}) {
	const team = await getTeamById(params.team)
	if (!team) return null

	return (
		<section className='w-full flex flex-col mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<Link href={'./'} className='text-[var(--green-dark-500)]'>
					Equipos
				</Link>{' '}
				/ {decodeURIComponent(team!.nombre)}
			</h2>

			<TableEditableClient team={team} />
		</section>
	)
}

'use client'

import Link from 'next/link'
import { ShortTeam } from '@/src/shared/types'
import TableTeams from '../moleculs/TablesTeam/Table'
import { useEffect, useState } from 'react'
import { getTeams } from '@/src/features/Teams/api/getTeams'

export default function TeamsCard() {
	const [teams, setTeams] = useState<ShortTeam[]>([])
	useEffect(() => {
		const fetchTeams = async () => {
			try {
				const teams = await getTeams()
				console.log('teams', teams)
				setTeams(teams)
			} catch (error) {
				console.error('Error fetching teams:', error)
			}
		}
		fetchTeams()
	}, [])

	return (
		<div className='scrollbar-thin-custom w-full flex flex-col gap-4 md:max-h-[calc(100vh-14rem)] md:overflow-y-auto xl:grid xl:grid-cols-2'>
			{teams.map((team, index) => (
				<article
					className='w-full bg-[var(--bg-card-obscure)] rounded-lg px-4 py-2 flex flex-col gap-2 xl:h-60'
					key={index}
				>
					<div>
						<p className='text-sm'>{team.name}</p>
						<Link
							href={`/dashboard/equipos/${team.name}`}
							className='text-lg font-bold leading-2.5'
						>
							{team.leader.name}
						</Link>
					</div>

					<TableTeams team={team} />
				</article>
			))}
		</div>
	)
}

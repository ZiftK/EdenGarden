'use client'

import Link from 'next/link'
import { ShortTeam } from '@/src/shared/types'
import TableTeams from '../moleculs/TablesTeam/Table'
import { useEffect, useState } from 'react'
import { getTeams } from '@/src/features/Teams/api/getTeams'
import Loading from '@/src/app/dashboard/equipos/loading'

export default function TeamsCard() {
	const [teams, setTeams] = useState<ShortTeam[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				setLoading(true)
				setError(null)
				const teams = await getTeams()
				setTeams(teams)
			} catch (error) {
				console.error('Error fetching teams:', error)
				setError('Error al cargar los equipos')
			} finally {
				setLoading(false)
			}
		}
		fetchTeams()
	}, [])

	if (loading) {
		return <Loading />
	}

	if (error) {
		return (
			<div className='flex items-center justify-center h-full text-[var(--father-font)]'>
				{error}
			</div>
		)
	}

	if (!teams.length) {
		return (
			<div className='flex items-center justify-center h-full text-[var(--father-font)]'>
				No hay equipos disponibles
			</div>
		)
	}

	return (
		<div className='scrollbar-thin-custom w-full flex flex-col gap-4 md:max-h-[calc(100vh-14rem)] md:overflow-y-auto xl:grid xl:grid-cols-2'>
			{teams.map((team) => (
				<article
					className='w-full bg-[var(--bg-card-obscure)] rounded-lg px-4 py-2 flex flex-col gap-2 xl:h-60'
					key={team.id_equipo}
				>
					<div>
						<p className='text-sm'>{team.nombre}</p>
						<Link
							href={`/dashboard/equipos/${team.id_equipo}`}
							className='text-lg font-bold leading-2.5'
						>
							{team.lider?.nombre || 'Sin líder asignado'}
						</Link>
					</div>

					<TableTeams team={team} />
				</article>
			))}
		</div>
	)
}

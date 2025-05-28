'use client'
import TableEditableClient from '@/src/features/Teams/ui/TableEditableClient'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import Link from 'next/link'
import { ShortTeam } from '@/src/shared/types'

export function TeamPageClient({ team }: { team: ShortTeam }) {
	const { user } = useAuthStore()

	return (
		<section className='w-full flex flex-col mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			{user?.rol === 'admin' && (
				<h2 className='text-md font-bold mb-4 inline-block mr-3'>
					<Link href={'./'} className='text-[var(--green-dark-500)]'>
						Equipos
					</Link>{' '}
					/ {decodeURIComponent(team.nombre)}
				</h2>
			)}

			<div className='w-full flex flex-col gap-4'>
				<TableEditableClient team={team} />
				{/* {isTeamLeader && <AttendanceCard />} */}
			</div>
		</section>
	)
}

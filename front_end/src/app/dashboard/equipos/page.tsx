import TeamsCard from '@/src/components/ERP/organisms/TeamsCard'
import Title from '@/src/shared/components/atoms/Title'
import { getTeams } from '@/src/features/Teams/api/getTeams'

export default async function page() {
	const data = await getTeams()

	return (
		<section
			aria-labelledby='dashboard-section-title'
			className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'
		>
			<Title
				title='Equipos'
				btn={{ active: true, path: '/dashboard/equipos/crear' }}
			/>

			<TeamsCard data={data} />
		</section>
	)
}

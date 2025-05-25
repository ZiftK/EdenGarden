'use client'

import TeamsCard from '@/src/components/ERP/organisms/TeamsCard'
import Title from '@/src/shared/components/atoms/Title'
import { Suspense } from 'react'
import Loading from './loading'

export default function Page() {
	return (
		<section
			aria-labelledby='dashboard-section-title'
			className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'
		>
			<Title
				title='Equipos'
				btn={{ active: true, path: '/dashboard/equipos/crear' }}
			/>

			<Suspense fallback={<Loading />}>
				<TeamsCard />
			</Suspense>
		</section>
	)
}

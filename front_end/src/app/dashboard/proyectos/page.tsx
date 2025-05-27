'use client'

import ShowAllProjects from '@/src/features/Projets/ui/showAllProjects'
import Title from '@/src/shared/components/atoms/Title'
import { Suspense } from 'react'

export default function Page() {
	return (
		<section
			aria-labelledby='dashboard-section-title'
			className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'
		>
			<Title
				title='Proyectos'
				btn={{ active: true, path: '/dashboard/proyectos/crear' }}
			/>

			<div className='flex flex-col gap-4 xl:grid xl:grid-cols-2'>
				<Suspense>
					<ShowAllProjects />
				</Suspense>
			</div>
		</section>
	)
}

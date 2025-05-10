import getProjects from '@/src/features/Projets/model/getProjects'
import Link from 'next/link'

export default async function Page({
	params,
}: {
	params: { proyecto: string }
}) {
	const projects = await getProjects()
	const project = projects.find(
		(project) => project.name === decodeURIComponent(params['proyecto'])
	)

	if (!project) return null

	return (
		<section className='mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<Link href={'./'} className='text-[var(--green-dark-500)]'>
					Proyectos
				</Link>{' '}
				/ {decodeURIComponent(project!.name)}
			</h2>
		</section>
	)
}

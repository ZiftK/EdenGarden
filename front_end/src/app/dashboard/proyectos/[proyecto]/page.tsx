import { getProjectById } from '@/src/features/Projets/api/getProjectById'

import Link from 'next/link'
import ShowProject from '@/src/features/Projets/ui/ShowProject'

export default async function Page({
	params,
}: {
	params: { proyecto: string }
}) {
	try {
		const project = await getProjectById(params.proyecto)

		if (!project) {
			return <div>Proyecto no encontrado</div>
		}

		return (
			<section className='text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2 '>
				<h2 className='text-md font-bold mb-4 inline-block mr-3'>
					<Link href={'./'} className='text-[var(--green-dark-500)]'>
						Proyectos
					</Link>{' '}
					/ {decodeURIComponent(project!.nombre)}
				</h2>

				<ShowProject project={project} />
			</section>
		)
	} catch (error) {
		console.error('Error loading project:', error)
		return <div>Error al cargar el proyecto</div>
	}
}

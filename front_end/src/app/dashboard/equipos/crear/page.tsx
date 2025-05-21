'use client'

import FormNewTeam from '@/src/features/Teams/ui/organisms/FormNewTeam'

export default function CreateTeamPage() {
	return (
		<section className='p-4'>
			<h1 className='text-2xl font-bold mb-6'>Crear Nuevo Equipo</h1>
			<FormNewTeam />
		</section>
	)
}

import CreateTeam from '@/src/features/Teams/ui/CreateTeam'

export default function page() {
	return (
		<section className='w-full flex flex-col mt-4 text-[var(--father-font)] md:row-start-2 md:row-end-4 xl:col-start-2'>
			<h2 className='text-md font-bold mb-4 inline-block mr-3 leading-0'>
				Crea un nuevo equipo
			</h2>
			<p className='text-sm'>
				Recuerda que solamente puedes integrar a un nuevo equipo a todo
				aquel que no esté en otro equipo
			</p>

			<CreateTeam />
		</section>
	)
}

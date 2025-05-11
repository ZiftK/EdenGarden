import FormNewProject from '@/src/features/Projets/components/organisms/FormNewProject'
import Link from 'next/link'

export default function Page() {
	return (
		<section
			aria-labelledby='dashboard-section-title'
			className=' overflow-x-auto w-full  mt-4 text-[var(--father-font)] mx-auto col-start-1 md:row-start-2  md:!col-start-1 md:row-span-3 xl:!col-start-2'
		>
			<h2 className='text-md font-bold mb-4 inline-block mr-3'>
				<Link href={'./'} className='text-[var(--green-dark-500)]'>
					Empleados
				</Link>{' '}
				/ Ingresa un nuevo empleado
			</h2>

			<FormNewProject />
		</section>
	)
}

import { LoginForm } from '@/src/features/auth/login/ui'
import bgPrimary from '@/public/assets/river.webp'

export default function LoginERP() {
	return (
		<section
			className='flex flex-col items-start h-svh bg-center bg-cover bg-no-repeat w-lvw justify-between sm:justify-start sm:p-0'
			style={{
				backgroundImage: `
                linear-gradient(to left, var(--green-bg-0), var(--green-bg) 20%, var(--green-bg-1) 60%),
                url(${bgPrimary.src})
                `,
			}}
		>
			<h1 className='text-3xl font-bold m-7 justify-start sm:mb-0'>
				Accede con tus credenciales
			</h1>
			<div
				style={{
					backgroundColor: 'var(--green-bg)',
				}}
				className='rounded-t-2xl h-[350px] p-10 flex flex-col gap-2 [width:clamp(320px,100%,360px)] sm:h-[420px] sm:pb-10 sm:pt-0 sm:pl-7'
			>
				<h2
					className='text-[1.25rem] mb-6 sm:mb-26'
					style={{
						color: 'var(--green-dark-500)',
					}}
				>
					Iniciar Sesión
				</h2>
				<LoginForm />
			</div>
		</section>
	)
}

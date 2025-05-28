'use client'

import Calendar from '@/src/components/ERP/moleculs/Calendar/Calendar'
import ResponsiveMenu from '@/src/components/ERP/organisms/ResponsiveMenu'
import img from '@/public/assets/icons/Logo_Eden_Icon.png'
import MeetsDay from '@/src/features/Meets/ui/MeetsDay'
import InfoUser from '@/src/components/ERP/moleculs/InfoUser'
import '@/src/app/globals.css'
import { AuthGuard } from '@/src/features/auth/ui/AuthGuard'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { Montserrat } from 'next/font/google'
import PayrollCard from '@/src/features/Payroll/components/PayrollCard'

const montSains = Montserrat({
	variable: '--font-mont-sains',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { user } = useAuthStore()

	return (
		<html lang='es' className='dark' suppressHydrationWarning={true}>
			<head>
				<link rel='icon' href={img.src} />
				<meta name='color-scheme' content='dark' />
			</head>
			<body className={montSains.className}>
				<AuthGuard>
					<div className='grid grid-cols-1 grid-rows-[55px_100px_auto_1fr] md:grid-rows-[55px_100px_125_1fr] md:h-dvh md:max-w-[700px] md:mx-auto md:grid-cols-[1fr_300px] xl:max-w-[1536px] xl:grid-cols-[200px_1fr_250px] xl:grid-rows-[55px_250px_1fr] min-h-full xl:pt-2 pt-20 px-2 gap-4 py-4'>
						{user && <InfoUser user={user} />}
						<Calendar />
						{user?.rol === 'admin' ? <MeetsDay /> : <PayrollCard />}
						{children}
						<ResponsiveMenu />
					</div>
				</AuthGuard>
			</body>
		</html>
	)
}

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import img from '@/public/assets/icons/Logo_Eden_Icon.png'
import LoadingOverlay from '@/src/components/ERP/atoms/LoadingOverlay/LoadingOverlay'

const montSains = Montserrat({
	variable: '--font-mont-sains',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Eden Garden',
	description:
		'Eden Garden es una tienda de jardinería que ofrece una amplia variedad de plantas, macetas y accesorios para el cuidado de tus espacios verdes.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='es' className='dark' suppressHydrationWarning={true}>
			<head>
				<link rel='icon' href={img.src} />
				<meta name='color-scheme' content='dark' />
			</head>
			<body className={montSains.className}>
				<LoadingOverlay />
				{children}
			</body>
		</html>
	)
}

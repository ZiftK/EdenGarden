'use client'
import { Box, Typography } from '@raul_yael/cleangui'
import bgPrimary from '@/public/assets/river.webp'
import { BtnFilled, BtnOutlined } from '../../../shared/components/atoms/Button'

/**
 * The `HomePage` component represents the main section of the homepage.
 * It features a visually appealing design with a gradient background and
 * a responsive layout. The component includes a title, contact information,
 * and two buttons for user interaction.
 *
 * @returns {JSX.Element} A JSX element representing the homepage section.
 *
 * @remarks
 * - The background is styled with a linear gradient and an image.
 * - The layout is responsive, with a flexible column-reverse structure.
 * - Includes two buttons: "Nuestro servicio" and "Contactanos".
 * - Displays a title and a contact phone number.
 *
 * @example
 * ```tsx
 * import { HomePage } from './homePage';
 *
 * function App() {
 *   return <HomePage />;
 * }
 * ```
 */
export function HomePage() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<Box
			as='section'
			className='bo'
			style={{
				boxShadow: 'none',
				background: `
            linear-gradient(to right, #000e, #000a ,#0000),
            url(${bgPrimary.src})  center/cover no-repeat
            `,
				height: '90svh',
				borderRadius: 0,
				width: '100vw',
				border: 'none',
				margin: 0,
				gap: '10px',
				padding: '0',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column-reverse',
					height: '100%',
					width: 'clamp(320px, 100%, 800px)',
					justifySelf: 'center',
					padding: '20px',
				}}
			>
				<Box
					as='div'
					style={{
						border: 'none',
						marginTop: 5,
						padding: 0,
						display: 'flex',
						flexDirection: 'row',
						gap: '10px',
						backgroundColor: 'transparent',
					}}
				>
					<BtnOutlined
						text='Nuestro servicio'
						style={{
							fontSize: 'var(--font-xs)',
							outline:
								'.7px solid var(--"var(--green-dark-transparent-100))',
						}}
						onClick={() => scrollToSection('about_us')}
					/>
					<BtnFilled
						text='Contactanos'
						onClick={() => scrollToSection('contact_form')}
						$bg='var(--white-peristance-color)'
						col='#557C2B'
					/>
				</Box>

				{/* Number home page */}
				<Typography
					as='p'
					style={{
						color: 'var(--white-peristance-color)',
					}}
				>
					+52 (55) 45034455
				</Typography>

				{/* Title Home Page */}
				<Typography
					color='bg'
					as='h1'
					style={{
						fontSize: 'var(--font-lg)',
						fontFamily: "'Montserrat', sans-serif",
						fontWeight: 'bold',
						width: '300px',
						color: 'var(--white-peristance-color)',
					}}
				>
					CREAMOS AMBIENTES NATURALES & ELEGANTES
				</Typography>
			</div>
		</Box>
	)
}

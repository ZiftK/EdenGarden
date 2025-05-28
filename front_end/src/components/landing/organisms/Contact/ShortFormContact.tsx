'use client'

import { useState } from 'react'
import { Typography, Box, Card } from '@raul_yael/cleangui'
import { Input } from '@raul_yael/cleangui'
import { useContactStore } from '@/src/features/Contact/model/contactStore'
import { BtnOutlined } from '@/src/shared/components/atoms/Button'
import './ShortForm.css'

export function ShortFormContact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		service: '',
		message: '',
	})
	const { createMessage, loading, error } = useContactStore()

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await createMessage({
				name: formData.name,
				email: formData.email,
				phone: formData.phone,
				message: `Servicio: ${formData.service}\n${formData.message}`,
			})

			if (!error) {
				setFormData({
					name: '',
					email: '',
					phone: '',
					service: '',
					message: '',
				})
			}
		} catch (error) {
			console.error('Error al enviar el mensaje:', error)
		}
	}

	return (
		<Box
			as='section'
			id='contact_form'
			className=' mx-auto px-4 my-80 bg-transparen'
		>
			<Card className='bg-transparent'>
				<Box className='px-6 py-6'>
					<Typography
						as='h2'
						style={{
							fontSize: 'var(--font-lg)',
							color: 'var(--father-font)',
						}}
					>
						<span>Ubicación</span>
					</Typography>
				</Box>

				<form
					onSubmit={handleSubmit}
					className='px-6 pb-6 bg-transparent'
				>
					<Box className='flex flex-col gap-6 bg-transparent'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<Input
								$variant='default'
								$bg='#00000000'
								$colorNoFocus='#00000000'
								$color='#8e988a98'
								$lightnessFactor={100}
								label='Nombre'
								$width='100%'
								$sxText={0.875}
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
							/>

							<Input
								$color='#8e988a98'
								$bg='#00000000'
								$colorNoFocus='#00000000'
								$variant='default'
								$lightnessFactor={40}
								label='Teléfono'
								$width='100%'
								$sxText={0.875}
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								required
							/>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<Input
								$color='#8e988a98'
								$variant='default'
								$bg='#00000000'
								$colorNoFocus='#00000000'
								$lightnessFactor={40}
								label='Email'
								$width='100%'
								$sxText={0.875}
								name='email'
								value={formData.email}
								onChange={handleChange}
								type='email'
								required
							/>

							<Input
								$color='#8e988a98'
								$variant='default'
								$bg='#00000000'
								$colorNoFocus='#00000000'
								$lightnessFactor={60}
								label='Tipo de servicio'
								$width='100%'
								$sxText={0.875}
								name='service'
								value={formData.service}
								onChange={handleChange}
								required
							/>
						</div>

						<Input
							$variant='default'
							$color='#8e988a98'
							$bg='#00000000'
							$colorNoFocus='#00000000'
							$lightnessFactor={0}
							label='Mensaje...'
							$width='100%'
							$sxText={0.875}
							className='min-h-[120px]'
							name='message'
							value={formData.message}
							onChange={handleChange}
							required
						/>

						{error && (
							<p className='text-red-500 text-center text-sm'>
								{error}
							</p>
						)}
					</Box>

					<Box className='w-full mt-8 bg-transparent'>
						<BtnOutlined
							text={loading ? 'Enviando...' : 'Enviar mensaje'}
							className={`text-sm px-4 py-1 h-8 transition-opacity ${
								loading ? 'opacity-50 pointer-events-none' : ''
							}`}
						/>
					</Box>
				</form>
			</Card>
		</Box>
	)
}

'use client'

import { useState } from 'react'
import { Typography } from '@raul_yael/cleangui'
import { Input } from '@raul_yael/cleangui'
import { useContactStore } from '@/src/features/Contact/model/contactStore'
import { BtnOutlined } from '@/src/shared/components/atoms/Button'

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

			// Solo limpiamos el formulario si no hubo errores
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
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-4xl mx-auto mt-24 p-6 bg-background rounded-lg shadow-sm'
		>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<Typography
					as='h2'
					className='col-span-full text-center text-father-font text-lg mb-6'
				>
					<span>Contáctenos</span>
				</Typography>

				<div className='space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 col-span-full'>
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
						label='Telefono'
						$width='100%'
						$sxText={0.875}
						name='phone'
						value={formData.phone}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 col-span-full'>
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

				<div className='col-span-full'>
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
				</div>

				{error && (
					<p className='col-span-full text-red-500 text-center'>
						{error}
					</p>
				)}

				<div className='col-span-full flex justify-end mt-4'>
					<BtnOutlined
						text={loading ? 'Enviando...' : 'Enviar mensaje'}
						className={`text-xs px-4 py-2 h-8 w-32 transition-opacity ${loading ? 'opacity-50 pointer-events-none' : ''}`}
					/>
				</div>
			</div>
		</form>
	)
}

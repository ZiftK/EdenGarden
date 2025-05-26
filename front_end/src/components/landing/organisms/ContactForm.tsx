'use client'

import { useState } from 'react'
import { Box, Typography } from '@raul_yael/cleangui'
import { useContactStore } from '@/src/features/Contact/model/contactStore'

export function ContactForm() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [statusMessage, setStatusMessage] = useState('')
	const { createMessage, loading } = useContactStore()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatusMessage('')

		try {
			await createMessage({
				name,
				email,
				phone,
				message,
			})

			setStatusMessage(
				'¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'
			)
			setName('')
			setEmail('')
			setPhone('')
			setMessage('')
		} catch (error) {
			console.error('Error al enviar el mensaje:', error)
			setStatusMessage(
				'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.'
			)
		}
	}

	return (
		<Box
			as='section'
			id='contacto'
			style={{
				padding: '40px 20px',
				backgroundColor: 'var(--bg-card)',
				maxWidth: '600px',
				margin: '0 auto',
				borderRadius: '8px',
			}}
		>
			<Typography
				as='h2'
				style={{
					fontSize: 'var(--font-lg)',
					marginBottom: '20px',
					color: 'var(--father-font)',
					textAlign: 'center',
				}}
			>
				Contáctanos
			</Typography>

			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='name' className='text-[var(--father-font)]'>
						Nombre completo
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className='p-2 rounded border border-[var(--bg-card-obscure)] bg-transparent text-[var(--father-font)]'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label
						htmlFor='email'
						className='text-[var(--father-font)]'
					>
						Correo electrónico
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className='p-2 rounded border border-[var(--bg-card-obscure)] bg-transparent text-[var(--father-font)]'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label
						htmlFor='phone'
						className='text-[var(--father-font)]'
					>
						Teléfono
					</label>
					<input
						type='tel'
						id='phone'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						className='p-2 rounded border border-[var(--bg-card-obscure)] bg-transparent text-[var(--father-font)]'
					/>
				</div>

				<div className='flex flex-col gap-2'>
					<label
						htmlFor='message'
						className='text-[var(--father-font)]'
					>
						Mensaje
					</label>
					<textarea
						id='message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
						rows={4}
						className='p-2 rounded border border-[var(--bg-card-obscure)] bg-transparent text-[var(--father-font)] resize-none'
					/>
				</div>

				{statusMessage && (
					<p
						className={`text-center ${statusMessage.includes('error') ? 'text-red-500' : 'text-green-500'}`}
					>
						{statusMessage}
					</p>
				)}

				<button
					type='submit'
					disabled={loading}
					className='mt-4 bg-[var(--green-dark-500)] text-white py-3 px-6 rounded hover:bg-[var(--green-dark-600)] disabled:opacity-50'
				>
					{loading ? 'Enviando...' : 'Enviar mensaje'}
				</button>
			</form>
		</Box>
	)
}

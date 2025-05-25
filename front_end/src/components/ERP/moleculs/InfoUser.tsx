'use client'

import Image from 'next/image'
import imgIcon from '@/public/assets/Profile-picture.jpg'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOutIcon, UserIcon, BellIcon, SettingsIcon } from './icons/iconst'
import { Employee } from '@/src/shared/types'

export default function InfoUser({ user }: { user: Employee }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const router = useRouter()

	// Cerrar el menú cuando se hace click fuera
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () =>
			document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleLogout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
			})

			if (response.ok) {
				router.push('/login')
			}
		} catch (error) {
			console.error('Error during logout:', error)
		}
	}

	return (
		<section className='w-full flex justify-between max-h-[55px] h-[55px] md:col-span-2 row-start-1 xl:col-start-2'>
			<div className='flex flex-col text-[var(--father-font)]'>
				<h1 className='font-bold text-2xl'>
					Buen día, {user?.nombre || 'Usuario'}
				</h1>
				<p className='text-sm'>{user?.rol || 'Cuenta'}</p>
			</div>

			<div className='relative' ref={menuRef}>
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className='focus:outline-none'
				>
					<Image
						src={user?.img || imgIcon}
						alt='Foto de perfil'
						className='rounded-full object-cover hover:ring-2 hover:ring-[var(--green-dark-500)] transition-all'
						width={55}
						height={55}
					/>
				</button>

				{isMenuOpen && (
					<div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[var(--bg-card-obscure)] ring-1 ring-black ring-opacity-5 z-50'>
						<div
							className='py-1'
							role='menu'
							aria-orientation='vertical'
						>
							<button
								className='flex items-center w-full px-4 py-2 text-sm text-[var(--father-font)] hover:bg-[var(--bg-card-obscure-200)] gap-2'
								onClick={() => router.push('/dashboard/perfil')}
							>
								<UserIcon h={16} color='var(--father-font)' />
								Mi Perfil
							</button>

							<button className='flex items-center w-full px-4 py-2 text-sm text-[var(--father-font)] hover:bg-[var(--bg-card-obscure-200)] gap-2'>
								<BellIcon h={16} color='var(--father-font)' />
								Notificaciones
								<span className='ml-auto bg-[var(--green-dark-500)] text-white text-xs rounded-full px-2'>
									2
								</span>
							</button>

							<button className='flex items-center w-full px-4 py-2 text-sm text-[var(--father-font)] hover:bg-[var(--bg-card-obscure-200)] gap-2'>
								<SettingsIcon
									h={16}
									color='var(--father-font)'
								/>
								Configuración
							</button>

							<div className='border-t border-[var(--bg-card-obscure-200)]'></div>

							<button
								className='flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-[var(--bg-card-obscure-200)] gap-2'
								onClick={handleLogout}
							>
								<LogOutIcon h={16} color='rgb(239 68 68)' />
								Cerrar Sesión
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

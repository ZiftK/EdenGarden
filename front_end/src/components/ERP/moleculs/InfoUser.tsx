'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Employee } from '@/src/shared/types'
import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { Button } from '@heroui/react'
import Image from 'next/image'
import imgDefault from '@/public/assets/Profile-picture.jpg'
import { LogOutIcon, UserIcon } from './icons/iconst'

export default function InfoUser({ user }: { user: Employee }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const router = useRouter()
	const { logout } = useAuthStore()

	// Obtener solo el primer nombre
	const firstName = user.nombre.split(' ')[0]

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
		await logout()
		setIsMenuOpen(false)
	}

	return (
		<section className='w-full flex justify-between max-h-[55px] h-[55px] md:col-span-2 row-start-1 xl:col-start-2'>
			<div className='flex flex-col text-[var(--father-font)]'>
				<h1 className='font-bold text-2xl'>Buen día, {firstName}</h1>
				<p className='text-sm capitalize'>{user.rol}</p>
			</div>

			<div className='relative' ref={menuRef}>
				<Button
					onPress={() => setIsMenuOpen(!isMenuOpen)}
					className='w-12 h-12 p-0 rounded-full bg-transparent flex items-center justify-center overflow-hidden'
				>
					<div className='relative w-12 h-12'>
						{user.img ? (
							<Image
								src={user.img}
								alt='foto de usuario'
								fill
								className='object-cover rounded-full bg-transparent'
							/>
						) : (
							<Image
								src={imgDefault}
								alt='foto de usuario por defecto'
								fill
								className='object-cover rounded-full bg-transparent'
							/>
						)}
					</div>
				</Button>

				{isMenuOpen && (
					<div className='absolute right-0 mt-2 w-64 bg-[var(--bg-card-obscure)] z-50 rounded-lg py-3'>
						<Button
							onPress={() => {
								router.push(
									`/dashboard/empleados/${user.id_empleado}`
								)
								setIsMenuOpen(false)
							}}
							className='flex items-center w-full px-6 py-4 text-base text-[var(--father-font)] hover:bg-[var(--bg-card-obscure-200)] gap-2 bg-transparent'
						>
							<UserIcon h={20} color='var(--father-font)' />
							Mi Perfil
						</Button>

						<Button
							onPress={handleLogout}
							className='flex items-center w-full px-6 py-4 text-base text-red-500 hover:bg-[var(--bg-card-obscure-200)] gap-2 bg-transparent'
						>
							<LogOutIcon h={20} color='rgb(239 68 68)' />
							Cerrar Sesión
						</Button>
					</div>
				)}
			</div>
		</section>
	)
}

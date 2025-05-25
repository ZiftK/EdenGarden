'use client'

import { useAuthStore } from '@/src/features/auth/model/useAuthStore'
import { Employee } from '@/src/shared/types'
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import { Button } from '@/src/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'

export default function InfoUser() {
	const { user, logout } = useAuthStore()

	if (!user) return null

	return (
		<div className='flex items-center justify-end gap-2 col-span-full'>
			<p className='text-sm font-medium'>{user.nombre}</p>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='relative h-8 w-8 rounded-full'
					>
						<Avatar className='h-8 w-8'>
							<AvatarFallback>
								{user.nombre.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-56' align='end' forceMount>
					<DropdownMenuItem onClick={() => logout()}>
						Cerrar sesión
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

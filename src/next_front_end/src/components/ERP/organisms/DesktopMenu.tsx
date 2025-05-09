'use client'

import { JSX } from 'react'
import Image from 'next/image'
import imgIcon from '@/public/assets/icons/Logo_Eden.png'
import { BtnHref } from '@/src/shared/components/atoms/Button'

type MenuProps = {
	menuItems: { label: string; link: string; icon: JSX.Element }[]
}

export default function DesktopMenu({ menuItems }: MenuProps) {
	return (
		<nav className='hidden xl:flex flex-col bg-[rgba(24,44,2)] rounded-sm min-w-full max-w-[200px] py-4 row-span-3 lg:!row-start-1'>
			<Image
				src={imgIcon.src}
				alt='Logo'
				width={130}
				height={30}
				className='mx-auto'
			/>

			<ul className='flex flex-col gap-8 pl-8 flex-grow mt-20'>
				{menuItems.map((item, index) => (
					<li key={index} className='flex items-center gap-2'>
						{item.icon}
						<a href={item.link} className='text-md'>
							{item.label}
						</a>
					</li>
				))}
			</ul>

			<BtnHref
				link='/login'
				text='Cerrar Sesion'
				weight={500}
				className='mx-auto place-self-end'
			/>
		</nav>
	)
}

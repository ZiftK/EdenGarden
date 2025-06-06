'use client'

import { JSX, useEffect, useState } from 'react'
import menuIcon from '@/public/assets/icons/menu.svg'
import Image from 'next/image'
import imgIcon from '@/public/assets/icons/Logo_Eden_Icon.png'
import { BtnFilled } from '@/src/shared/components/atoms/Button'
import { SidebarMenu } from '../../shared/atoms/Sidebar'

type MenuProps = {
	menuItems: { label: string; link: string; icon: JSX.Element }[]
}

export default function MobileMenu({ menuItems }: MenuProps) {
	const [isOpen, setIsOpen] = useState(false)
	const toogleOpen = () => {
		setIsOpen((prev) => !prev)
	}

	const [hasMounted, setHasMounted] = useState(false)
	useEffect(() => setHasMounted(true), [])

	return (
		<div className='sm-0.5 xl:hidden'>
			<nav
				className='fixed top-0 left-0 flex w-full justify-between items-center
                pl-4 pr-2 py-3 bg-[rgba(24,44,2)] text-[var(--father-font)]'
			>
				<Image src={imgIcon.src} alt='Logo' width={30} height={30} />

				<BtnFilled onClick={toogleOpen}>
					<Image
						src={menuIcon}
						alt='Menu_Icon'
						width={20}
						height={20}
						style={{ color: 'var(var(--father-font)' }}
					/>
				</BtnFilled>
			</nav>
			{hasMounted && (
				<SidebarMenu
					menuItems={menuItems}
					isOpen={isOpen}
					close={toogleOpen}
				/>
			)}
		</div>
	)
}

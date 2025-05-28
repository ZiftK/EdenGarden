'use client'

import {
	GroupIcon,
	CertifiedIcon,
	MessageIcon,
} from '../../landing/atoms/Icons/Icons'
import { UserIcon } from '../moleculs/icons/iconst'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const colorIcons = 'var(--father-font)'

const menuItems = [
	{
		label: 'Proyectos',
		link: '/dashboard/proyectos',
		icon: CertifiedIcon({
			color: colorIcons,
			h: 20,
		}),
	},
	{
		label: 'Equipos',
		link: '/dashboard/equipos',
		icon: GroupIcon({
			color: colorIcons,
			h: 20,
		}),
	},
	{
		label: 'Empleados',
		link: '/dashboard/empleados',
		icon: UserIcon({
			color: colorIcons,
			h: 20,
		}),
	},
	{
		label: 'Mensajes',
		link: '/dashboard/mensajes',
		icon: MessageIcon({
			color: colorIcons,
			h: 20,
		}),
	},
]

export default function ResponsiveMenu() {
	return (
		<>
			<DesktopMenu menuItems={menuItems} />
			<MobileMenu menuItems={menuItems} />
		</>
	)
}

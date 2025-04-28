import { CertifiedIcon, GroupIcon, StoreIcon } from "../../landing/atoms/Icons/Icons"
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"

const menuItems = [
    { label: "Inicio", link: "/dashboard", icon: StoreIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] })},
    { label: "Proyectos", link: "/dashboard/proyectos", icon: GroupIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] })},
    { label: "Equipos", link: "/dashboard/equipos", icon: CertifiedIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] }) },
    { label: "Empleados", link: "/dashboard/empleados", icon: CertifiedIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] })},
]

export default function ResponsiveMenu() {

    return (
        <>
            <DesktopMenu menuItems={menuItems}/>
            <MobileMenu menuItems={menuItems}/>
        </>
    )
}
import { CertifiedIcon, GroupIcon, StoreIcon } from "../../landing/atoms/Icons/Icons"
import MobileMenu from "./MobileMenu"

const menuItems = [
    { label: "Home", link: "/", icon: StoreIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] })},
    { label: "About", link: "/about", icon: GroupIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] })},
    { label: "Services", link: "/services", icon: CertifiedIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] }) },
    { label: "Contact", link: "/contact", icon: CertifiedIcon({ color: "var(--white-peristance-color)", size: [1.25,1.25] })},
]

export default function ResponsiveMenu() {
    return (
        <div className="relative">
            <div>
                <MobileMenu menuItems={menuItems}/>
            </div>

        </div>
    )
}
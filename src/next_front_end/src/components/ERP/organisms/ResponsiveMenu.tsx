import { CertifiedIcon, GroupIcon, StoreIcon } from "../../landing/atoms/Icons/Icons"
import MobileMenu from "./MobileMenu"

const menuItems = [
    { label: "Home", link: "/", icon: StoreIcon({ color: "#fff", size: [24,24] })},
    { label: "About", link: "/about", icon: GroupIcon({ color: "#fff", size: [24,24] })},
    { label: "Services", link: "/services", icon: CertifiedIcon({ color: "#fff", size: [24,24] }) },
    { label: "Contact", link: "/contact", icon: CertifiedIcon({ color: "#fff", size: [24,24] })},
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
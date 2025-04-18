'use client'

import { JSX, useState } from "react"
import menuIcon from "@/public/assets/icons/menu.svg"
import Image from "next/image"
import imgIcon from "@/public/assets/icons/Logo_Eden_Icon.png"
import { BtnFilled } from "@/src/shared/components/atoms/Button"
import { SidebarMenu } from "../../shared/atoms/Sidebar"

type MenuProps = {
    menuItems: {label: string, link: string, icon: JSX.Element}[]
}

export default function MobileMenu({ menuItems }: MenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const toogleOpen = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="relative">
            <nav className="flex w-full justify-between items-center
                pl-4 pr-2 py-3 bg-[rgba(56,86,24,0.69)]">
                <Image src={imgIcon.src} alt="Logo" width={30} height={30}/>    

                <BtnFilled onClick={toogleOpen}>
                        <Image 
                            src={menuIcon} 
                            alt="Menu_Icon" 
                            width={20} 
                            height={20} 
                            style={{ color: "var(--white-peristance-color)" }} 
                        />
                    </BtnFilled>
                    
            </nav>
            <SidebarMenu
                menuItems={menuItems}
                isOpen={isOpen}
                close={toogleOpen}
            />
        </div>
    )
}
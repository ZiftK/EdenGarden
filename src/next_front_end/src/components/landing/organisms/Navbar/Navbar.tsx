"use client"

import Image from 'next/image'
import logo from '@/public/assets/icons/Logo_Eden.png'
import icon from '@/public/assets/icons/menu.svg'
import { Box } from '@raul_yael/cleangui'
import { SidebarMenu } from '../../../shared/atoms/Sidebar'
import { BtnFilled } from '../../../../shared/components/atoms/Button'
import { BtnMoon } from '../../atoms/BtnMoon'
import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false)
    const toogleOpen = () => setIsOpen(!isOpen)

    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {setHasMounted(true)},[])

    return(
        <Box 
            as='section'
            className='navbar'
            id='navbar_box'
        >
            <div className='flex justify-between w-full max-w-[800px] min-w-[320px] justify-self-center'>   
                <Image 
                    src={logo} 
                    alt="Eden Garden Logo" 
                    height={30} 
                    style={{ alignSelf: 'center', marginLeft: '15px' }} 
                />
                {/* Botones del navbar */}
                <Box 
                    as='div'
                    style={{                
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '0px',
                        justifyContent: 'center',
                        alignItems:'center',
                        border:'none',
                        boxShadow: 'none',
                        padding: 0,
                        margin: 0,
                        backgroundColor:'transparent',
                        color: 'transparent',                   
                    }}
                >
                    <BtnMoon />
                    <BtnFilled onClick={toogleOpen}>
                        <Image 
                            src={icon} 
                            alt="Menu_Icon" 
                            width={20} 
                            height={20} 
                            style={{ color: "var(--white-peristance-color)" }} 
                        />
                    </BtnFilled>
                    {hasMounted && <SidebarMenu 
                        menuItems={[
                            { label: 'Inicio', link: '/', icon:icon},
                            { label: 'Sobre nosotros', link: '/about', icon:icon},
                            { label: 'Servicios', link: '/services', icon:icon},
                            { label: 'Contacto', link: '/contact', icon:icon},
                        ]}
                        isOpen={isOpen}
                        close={() => setIsOpen(false)}
                    />}

                </Box>
            </div>
        </Box>
    )
}
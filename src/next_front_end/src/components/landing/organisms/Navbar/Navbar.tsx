"use client"

import Image from 'next/image'
import logo from '../../../../public/assets/icons/Logo_Eden.png'
import icon from '../../../../public/assets/icons/menu.svg'
import { Box } from '@raul_yael/cleangui'
import { SidebarMenu } from '../../atoms/Sidebar'
import { BtnFilled } from '../../moleculs/Button'
import { BtnMoon } from '../../atoms/BtnMoon'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false)
    const toogleOpen = () => setIsOpen(!isOpen)

    return(
        <Box 
            as='section'
            className='navbar'
            id='navbar_box'
        >
            <div id='navbar_container'>
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
                    <SidebarMenu 
                        isOpen={isOpen}
                        close={() => setIsOpen(false)}
                    />

                </Box>
            </div>
        </Box>
    )
}
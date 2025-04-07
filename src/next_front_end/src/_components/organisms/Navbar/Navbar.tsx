import Image from 'next/image'
import logo from '/Logo_Eden.png'
import icon from '../../../assets/icons/menu.svg'
import { Box } from '@raul_yael/cleangui'
import { SidebarMenu } from '../../atoms/Sidebar'
import { BtnFilled, BtnMoon } from '../../moleculs/Button'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false)
    const toogleOpen = () => setIsOpen(!isOpen)

    return(
        <Box 
            type='section'
            className='navbar'
            id='navbar_box'
        >
            <div className='navbar_container'>
                <Image 
                    src={logo} 
                    alt="Eden Garden Logo" 
                    height={30} 
                    style={{ alignSelf: 'center', marginLeft: '15px' }} 
                />
                {/* Botones del navbar */}
                <Box 
                    type='div'
                    style={{                
                        display: 'flex',
                        gap: '0px',
                        justifyContent: 'center',
                        alignItems:'center',
                        border:'none',
                        boxShadow: 'none',
                        padding: 0,
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
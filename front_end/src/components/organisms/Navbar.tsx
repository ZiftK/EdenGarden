import logo from '/Logo_Eden.png'
import icon from '../../assets/icons/menu.svg'
import { Box } from '@raul_yael/cleangui'
import { SidebarMenu } from '../atoms/Sidebar'
import { BtnFilled, BtnMoon } from '../moleculs/Button'
import { useState } from 'react'

export default function Navbar(){
    const [isOpen, setIsOpen] = useState(false)
    const toogleOpen = () => setIsOpen(!isOpen)

    return(
        <Box 
            type='section'
            className='navbar'
            style={{
                margin: 0,
                position: 'fixed',
                display: 'flex',
                border: 'none',
                boxShadow: 'none',
                padding:'5px',
                width: '100vw',
                justifyContent: 'space-between',
                height: '55px',
                borderRadius:0,
                backgroundColor: 'rgb(56,86,24,.69)',
                top:0,
            }}
        >
            {/* Logo del navbar */}
            <img src={logo} style={{ height: '30px', alignSelf:'center', marginLeft:'15px'}}/>


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
                    <img src={icon} alt="Menu_Icon" style={{
                        color: "var(--white-peristance-color)",
                        width: '20px',
                        height: '20px',
                        }} />
                </BtnFilled>
                <SidebarMenu 
                    isOpen={isOpen}
                    close={() => setIsOpen(false)}
                />
                
            </Box>
        </Box>
    )
}
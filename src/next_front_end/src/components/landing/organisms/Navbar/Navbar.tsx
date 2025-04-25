import Image from 'next/image'
import logo from '@/public/assets/icons/Logo_Eden.png'
import { Box } from '@raul_yael/cleangui'
import { BtnMoon } from '../../atoms/BtnMoon'
import './Navbar.css'

export default function Navbar(){


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
                </Box>
            </div>
        </Box>
    )
}
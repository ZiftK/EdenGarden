"use client"
import { Box, Typography } from "@raul_yael/cleangui";
import bgPrimary from '../../../public/assets/river.webp'
import { BtnFilled, BtnOutlined } from "../moleculs/Button";


export function HomePage(){
    return(
    <Box type='section'
        style={{
            boxShadow: 'none',
            background: `
            linear-gradient(to right, #000e, #000a ,#0000),
            url(${bgPrimary.src})  center/cover no-repeat
            `,
            height: '90svh',
            borderRadius: 0,
            width: '100vw',
            border: 'none',
            margin: 0,          
            gap: '10px',
        }}
        >
    
        <div
            style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                height: '100%',
                width: 'clamp(320px, 100%, 800px)',
                justifySelf: 'center',
                padding: "20px"
            }}
        >

        <Box
            type="div"
            style={{
                border: 'none',
                marginTop: 5,
                padding:0,
                display: "flex",
                gap: '10px',
                backgroundColor: 'transparent',
            }}
        >
            <BtnOutlined text="Nuestro servicio" style={{fontSize: 'var(--font-xs)'}}/>
            <BtnFilled text="Contactanos" onClick={() => 1} $bg="var(--white-peristance-color)" col="#557C2B"/> 
        </Box> 

    
        {/* Number home page */}
        <Typography                 
                variant='p'
                style={{
                    color: "var(--white-peristance-color)"
                }}
        > 
            +52 (55) 45034455
        </Typography>

        {/* Title Home Page */}
        <Typography 
                color='bg'
                variant='h1'
                style={{
                    fontSize: 'var(--font-lg)',
                    fontFamily:  "'Montserrat', sans-serif",
                    fontWeight: 'bold',
                    width: '300px',
                    color: "var(--white-peristance-color)"
                }}
        > 
            CREAMOS AMBIENTES NATURALES & ELEGANTES
        </Typography>
        </div>
    </Box>
    )
}
import { Box, Typography } from "@raul_yael/cleangui";
import imgRiver from "@/public/assets/river.webp"
import imgHouse_2 from "@/public/assets/house_2.webp"
import pots from "@/public/assets/garden_pots.webp"
import { CSSProperties } from "react";


export function Galleryview(){
    return (
        <Box
            as="section"
            style={{
                display: "flex",
                flexWrap: 'wrap',
                justifyContent: "center",
                alignItems: "center",
                gap: '40px',
                boxShadow: "none",
                border: 'none',                    
                margin: '20px 0px',
                borderRadius:0,
                background: 'var(--background)',
                padding: '20px'
            }}
        >
            <CardImage 
                letter="A/"
                title="Nuestros objetivos"
                description="Nos desempeñamos como expertos en el diseño y fabricación de cascadas artificales."
                imgUrl={imgRiver.src}
            />
            <CardImage 
                letter="B/"
                title="Nuestros objetivos"
                description="Nos desempeñamos como expertos en el diseño y fabricación de cascadas artificales."
                imgUrl={imgHouse_2.src}
            />
            <CardImage 
                letter="C/"
                title="Nuestros objetivos"
                description="Nos desempeñamos como expertos en el diseño y fabricación de cascadas artificales."
                imgUrl={pots.src}
                style={{ backgroundPosition: "center center"}}
            />
        </Box>
    )
}

const CardImage = ({
    letter,
    title,
    description,
    imgUrl,
    style
}:{
    letter:string,
    title: string,
    description: string,
    imgUrl: string,
    style?: CSSProperties
}) => {
    return(
        <Box
            as="section"
            style={{
                border: 'none',                    
                padding:'100px 5px 0px 20px',
                display: "flex",
                gap: '5px',                
                boxShadow: "none",
                margin:0,
                width: "clamp(300px, 100%, 800px)",
                height: '160px',
                background: `linear-gradient(to bottom, transparent 0%, var(--background) 80%), url(${imgUrl}) center / cover no-repeat`,
                ...style
            }}
            
        >
            <Typography                      
                style={{
                    fontWeight:'800',
                    color: 'var(--secondary-color)',
                    fontSize: "var(--font-xxl)",                   
                }}
            > 
                {letter}
            </Typography>

                <Box
                    as="section"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        // justifyContent: "center",
                        boxShadow: "none",
                        border: 'none',                    
                        margin:0,
                        borderRadius:0,
                        padding: 0,
                        backgroundColor: "#0000"                
                    }}
                >
                    <Typography                       
                        style={{
                            fontWeight: "500",
                            fontSize:"var(--font-md)",
                            color: 'var(--green-200)'
                        }}
                    > 
                        {title}
                    </Typography>

                    <Typography                         
                        style={{
                            fontSize: "var(--font-xs)",     
                            color: "var(--father-font)"
                            
                        }}
                    > 
                        {description}
                    </Typography>
                    </Box>
            
        </Box>
    )
}
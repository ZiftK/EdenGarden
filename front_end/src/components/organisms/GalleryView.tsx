import { Box, Typography } from "@raul_yael/cleangui";
import imgRiver from "../../assets/river.webp"
import imgHouse_2 from "../../assets/house_2.webp"
import pots from "../../assets/garden_pots.webp"
import { CSSProperties } from "react";

export function Galleryview(){
    return (
        <Box
            type="section"
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
                background: 'var(--background)'
            }}
        >
            <CardImage 
                letter="A/"
                title="Nuestros objetivos"
                description="Nos desempeñamos como expertos en el diseño y fabricación de cascadas artificales."
                img={imgRiver}
            />
            <CardImage 
                letter="B/"
                title="Nuestros objetivos"
                description="Nos desempeñamos como expertos en el diseño y fabricación de cascadas artificales."
                img={imgHouse_2}
            />
            <CardImage 
                letter="C/"
                title="Nuestros objetivos"
                description="Nos desempeñamos como expertos en el diseño y fabricación de cascadas artificales."
                img={pots}
                style={{ backgroundPosition: "center center"}}
            />
        </Box>
    )
}

const CardImage = ({
    letter,
    title,
    description,
    img,
    style
}:{
    letter:string,
    title: string,
    description: string,
    img: string,
    style?: CSSProperties
}) => {
    return(
        <Box
            type="section"
            style={{
                border: 'none',                    
                padding:'100px 5px 0px 20px',
                display: "flex",
                gap: '5px',                
                boxShadow: "none",
                margin:0,
                width: "clamp(300px, 90%, 1008px)",
                height: '160px',
                background: `linear-gradient(to bottom, transparent 0%, var(--background) 80%), url(${img}) center / cover no-repeat`,
                ...style
            }}
            
        >
            <Typography 
                children={letter}           
                style={{
                    fontWeight:'800',
                    color: 'var(--secondary-color)',
                    fontSize: "var(--font-xxl)",
                   
                }}
                />

                <Box
                    type="section"
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
                        children={title}        
                        style={{
                            fontWeight: "500",
                            fontSize:"var(--font-md)",
                            color: 'var(--green-200)'
                        }}
                        />

                    <Typography 
                        children={description}
                        style={{
                            fontSize: "var(--font-xs)",     
                            color: "var(--father-font)"
                            
                        }}
                        />
                    </Box>
            
        </Box>
    )
}
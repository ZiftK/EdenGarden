import { Box } from "@raul_yael/cleangui"
import flowerPink from "../../assets/flower_pot_2.webp"
import flower from "../../assets/flower_pot.webp"
import flowerWhite from "../../assets/flower_pot_3.webp"

export function FlowersGallery(){
    return(
        <Box type="div"
             style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                height: "250px",
                justifyContent: "space-evenly",
                gap: '10px',
                padding: 0,
                margin: 0,
                border: "none",
                background: "var(--background)"
             }}
            >
            <div 
                style={{
                    background: `linear-gradient(to bottom, var(--green-dark-transparent-400) 0%, var(--green-dark-transparent-400) 80%), url(${flowerPink}) -20px center/cover no-repeat`,
                    height:'100%',
                    margin: 0,
                }}
            />
            <div 
                style={{
                    background: `linear-gradient(to bottom, var(--green-dark-transparent-400) 0%, var(--green-dark-transparent-400) 80%), url(${flower}) -207px center/cover no-repeat`,
                    height:'100%',
                    margin: 0,
                }}
            />
            <div 
                style={{
                    background: `linear-gradient(to bottom, var(--green-dark-transparent-400) 0%, var(--green-dark-transparent-400) 80%), url(${flowerWhite}) -20px center/cover no-repeat`,
                    height:'100%',
                    margin: 0,
                }}
            />

        </Box>
    )
}
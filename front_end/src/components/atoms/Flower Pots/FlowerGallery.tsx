import { Box } from "@raul_yael/cleangui"
import flowerPink from "../../../assets/flower_pot_2.webp"
import flower from "../../../assets/flower_pot.webp"
import flowerWhite from "../../../assets/flower_pot_3.webp"
import "./FlowerGallery.css"

export function FlowersGallery(){
    return(
        <Box type="div"
            id="FlowerGallery_Box"
            >
            <div 
                style={{
                    background: `linear-gradient(to bottom, var(--green-dark-transparent-400) 0%, var(--green-dark-transparent-400) 80%), url(${flowerPink}) center/cover no-repeat`,
                    height:'100%',
                    margin: 0,
                }}
            />
            <div 
                style={{
                    background: `linear-gradient(to bottom, var(--green-dark-transparent-400) 0%, var(--green-dark-transparent-400) 80%), url(${flower}) right center/cover no-repeat`,
                    height:'100%',
                    margin: 0,
                }}
            />
            <div 
                style={{
                    background: `linear-gradient(to bottom, var(--green-dark-transparent-400) 0%, var(--green-dark-transparent-400) 80%), url(${flowerWhite}) center/cover no-repeat`,
                    height:'100%',
                    margin: 0,
                }}
            />

        </Box>
    )
}
import { CardFrutal } from "../moleculs/CardFrutal";
import { FrutalTreesTitle } from "../moleculs/FrutalTreesTitle";
import { Box } from "@raul_yael/cleangui";
import imgTree from "../../assets/fruit_trees.jpg"


export function FrutalTrees(){
    return(
        <Box type="section"
            style={{
                boxShadow: "none",
                background: `url(${imgTree}) center/cover`,
                margin: "60px 0px",
                border:0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems:"center",
                gap: "10px",
                borderRadius: 0,
                height:"350px"
            }}
        >
            <FrutalTreesTitle />
            <CardFrutal />
        </Box>
    )
}


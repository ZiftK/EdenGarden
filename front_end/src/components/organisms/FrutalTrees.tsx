import { CardFrutal } from "../moleculs/CardFrutal";
import { FrutalTreesTitle } from "../moleculs/FrutalTreesTitle";
import { Box } from "@raul_yael/cleangui";
import imgTree from "../../assets/fruit_trees.webp"


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
                height:"350px",
            }}
        >
            <FrutalTreesTitle title="NARANJAS"/>
            <CardFrutal 
                title="Arboles Frutales"
                description="Un espacio verde no está completo sin árboles frutales. Nos dimos a la tarea de sembrar y cuidar nuestros propios árboles decorativos y frutales para venta a nuestros clientes. Los tenemos ya crecidos o en libre crecimiento para que decoren su hogar o su comercio."
            />
        </Box>
    )
}


import { CardFrutal } from "../../moleculs/CardFrutal";
import { FrutalTreesTitle } from "../../moleculs/FrutalTreesTitle";
import { Box } from "@raul_yael/cleangui";
import "./FrutalTrees.css"

export function FrutalTrees(){
    return(
        <Box type="section"
            id="Frutal_trees_box"
        >
            <div className="FurtalTrees">
                <FrutalTreesTitle title="NARANJAS"/>
                <CardFrutal 
                    title="Arboles Frutales"
                    description="Un espacio verde no está completo sin árboles frutales. Nos dimos a la tarea de sembrar y cuidar nuestros propios árboles decorativos y frutales para venta a nuestros clientes. Los tenemos ya crecidos o en libre crecimiento para que decoren su hogar o su comercio."
                    />
            </div>
        </Box>
    )
}


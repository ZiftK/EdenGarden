import { Box } from "@raul_yael/cleangui";
import { DescriptionPots } from "../../atoms/Flower Pots/DescriptionPots";
import { FlowersGallery } from "../../atoms/Flower Pots/FlowerGallery";
import "./FlowerPots.css"

export function FlowerPots(){
    return(
        <Box type="section"
            id="FlowerPots_Box"
            >
            <DescriptionPots />
            <FlowersGallery />
        </Box>
    )
}
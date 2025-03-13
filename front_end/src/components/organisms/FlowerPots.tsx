import { Box } from "@raul_yael/cleangui";
import { DescriptionPots } from "../atoms/DescriptionPots";
import { FlowersGallery } from "../atoms/FlowerGallery";

export function FlowerPots(){
    return(
        <Box type="section"
             style={{
                border: "none",
                boxShadow: "none",
                background: "var(--background)",
                margin: 0,
                padding: "0px",
                display: "grid",
                gridTemplateColumns: "1fr",
                maxWidth: '100%',

             }}
            >
            <DescriptionPots />
            <FlowersGallery />
        </Box>
    )
}
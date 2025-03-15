import { Box } from "@raul_yael/cleangui";
import { CommercialServices } from "../atoms/CommercialServices";
import { ResidentialeServices } from "../atoms/ResidentialServices";

export function Footer(){
    return(
        <Box type="section"
            style={{
                backgroundColor: "var(--green-200)",
                borderRadius: 0,
                margin:0,
                padding: "20px",
                border: "none",
                display: "flex"
            }}
        >
            <CommercialServices/>
            <ResidentialeServices />
        </Box>
    )
}
import { Box, Typography } from "@raul_yael/cleangui";
import { CommercialServices } from "../atoms/CommercialServices";
import { ResidentialeServices } from "../atoms/ResidentialServices";
import { BtnSocial } from "../atoms/BtnSocial";

export function Footer(){
    return(
        <Box type="footer"
            style={{
                backgroundColor: "var(--green-200)",
                borderRadius: 0,
                margin:0,
                padding: "20px",
                paddingBottom: "5px",
                border: "none",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <div
                style={{
                    display: "flex"
                }}
            >
                <CommercialServices/>
                <ResidentialeServices />
            </div>

            <BtnSocial />

            <Typography 
                style={{
                    fontSize: "var(--font-xxs)",
                    alignSelf: "center"
                }}
            >
                <p>
                    Eden Garden
                    <span style={{ color: "#fff5"}}>
                        © 2025. Todos los Derechos Reservados
                    </span>
                </p>
            </Typography>
        </Box>
    )
}


import { Box, Typography } from "@raul_yael/cleangui";
import { CommercialServices } from "../../atoms/CommercialServices";
import { ResidentialeServices } from "../../atoms/ResidentialServices";
import { BtnSocial } from "../../atoms/BtnSocial";
import "./Footer.css"

export function Footer(){
    return(
        <Box as="footer"
            id="footer_box"
        >
            <section
                style={{
                    width: "clamp(300px, 100%, 800px)",
                    placeSelf: "center",
                    padding: "0pc 20px"
                }}
            >
                <div
                    className="footer_services"
                    style={{
                        display: "flex",
                        gap: "2px"
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
            </section>
        </Box>
    )
}
"use client"

import { Box, Typography } from "@raul_yael/cleangui";
import { BtnHref } from "../moleculs/Button";

export function CommercialServices(){
    return(
        <Box type="div"
            id="comercial_services_box"
            style={{
                border: 0,
                margin: 0,
                padding:0,
                boxShadow: "none",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                width: "55%",
                gap: "6px",                
            }}
        >
            <Typography 
                        size="var(--font-sm)"
                        style={{ 
                            letterSpacing:"1px",
                            lineHeight: "100%",
                        }}
            >
                Servicios Comerciales
            </Typography>

            <BtnHref link="#"
                text="Mantenimiento de Cesped"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Venta de cesped"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Diseño de interiores"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Muros Tematicos para interiores"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Poda & Fumigacion"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
        </Box>
    )
}
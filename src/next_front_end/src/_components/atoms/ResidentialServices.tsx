import { Box, Typography } from "@raul_yael/cleangui";
import { BtnHref } from "../moleculs/Button";

export function ResidentialeServices(){
    return(
        <Box type="div"
            id="residential_services_box"
            style={{
                border: 0,
                margin: 0,
                padding:0,
                boxShadow: "none",
                backgroundColor: "var(--backfground)",
                display: "flex",
                flexDirection: "column",
                width: "45%",
                gap: "6px"
            }}
        >
            <Typography 
                        size="var(--font-sm)"
                        style={{ 
                            letterSpacing:"1px",
                            lineHeight: "100%"
                        }}
            >
                Servicios Residenciales
            </Typography>
            <BtnHref link="#"
                text="Paisajismo y Decoracion"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Mantenimiento a Jardines"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Cascadas Artificiales"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Muros Tematicos"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
            <BtnHref link="#"
                text="Poda Profesional"
                sxText="var(--font-xxs)"
                weight={100}
                style={{
                    fontWeight: "ligther"
                }}
            />
        </Box>
    )
}
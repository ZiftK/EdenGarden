"use client"

import { Box, Typography } from "@raul_yael/cleangui";
import "./Location.css"

export function Location(){
    return(
        <Box as="section"
            id="location_box"
        >
            <Typography 
                as="h2"
                style={{
                    fontSize: "var(--font-lg)",
                    color: "var(--father-font)"
                }}
            > 
                <span>Ubicación</span>
            </Typography>

            <Typography  
                as="p"
                style={{
                    fontSize: "var(--font-xs)",
                    color: "var(--green-200)",                  
                }}
                >``
                    <span>
                        Mercado de plantas & flores<br/>
                        “Cuemanco”<br/>
                        Mz. 10 Lte. 48<br/>
                        Xochimilco, CDMX.
                    </span>
            </Typography>

            <Typography
                weight={"bold"}
                as="p"
                style={{
                    fontSize: "var(--font-xs)",
                    color: "var(--text-label)"
                }}
                >
                    <span>
                        (55) 4053 2340 
                        <br />
                        info@edengarden.com.mx 
                        <br/>
                        ventas@edengarden.com.mx
                    </span>
            </Typography>

            <Typography 
                as="p"
                style={{
                    fontSize: "var(--font-xs)",
                    color: "var(--text-label)"
                }}
            >
                <span>
                    Lunes - Domingo horario abierto<br/>
                    Disponibles por Email y por telefono
                </span>
            </Typography>
            <Typography 
                as="p"
                style={{
                    fontSize: "var(--font-xs)",
                    color: "var(--green-200)",
                    alignSelf: "end",
                    width: "clamp(120px,40%,200px)",
                    marginTop: "10px",
                    padding: 0
                }}
            >
                <span>Atendemos en toda la republica.</span>
            </Typography>
        </Box>
    )
}
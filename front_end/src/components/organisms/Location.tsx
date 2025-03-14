import { Box, Typography } from "@raul_yael/cleangui";

export function Location(){
    return(
        <Box type="section"
            style={{
                border: "none",
                margin: 0,
                padding: "20px",
                boxShadow: "none",
                backgroundColor: "var(--background)",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}
        >
            <Typography children="Donde ubicarnos"
                variant="h2"
                style={{
                    fontSize: "var(--font-lg)",
                    color: "var(--father-font)"
                }}
                />
            <Typography  
                variant="p"
                style={{
                    fontSize: "var(--font-xs)",
                    color: "var(--green-200)",                  
                }}
                >
                    <span>
                        Mercado de plantas & flores<br/>
                        “Cuemanco”<br/>
                        Mz. 10 Lte. 48<br/>
                        Xochimilco, CDMX.
                    </span>
            </Typography>

            <Typography
                weight={"bold"}
                variant="p"
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
                variant="p"
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
            <Typography children="Atendemos en toda la republica."
                variant="p"
                style={{
                    fontSize: "var(--font-xs)",
                    color: "var(--green-200)",
                    alignSelf: "end",
                    width: "50%",
                    marginTop: "10px"
                }}
                />
        </Box>
    )
}
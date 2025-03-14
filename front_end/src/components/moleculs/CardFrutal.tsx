import { Box, Typography } from "@raul_yael/cleangui";

export function CardFrutal(){
    return(
        <Box type="div"
            style={{
                border: "10px solid var(--background)",
                boxShadow: "none",
                background: "#000000c9",
                borderRadius:"20px",
                margin: "130px 60px 0px 0px",
                padding: "18px 50px 18px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width:"250px",
                backdropFilter: "blur(5px)",
                
            }}
        >
            <Typography 
                variant="h2"
                children = "Arboles Frutales"
                style={{
                    color: "var(--background)",
                    fontSize: "var(--font-md)",
                    fontWeight: "600"
                }}
            />

            <Typography 
                variant="p"
                children = "Un espacio verde no está completo sin árboles frutales. Nos dimos a la tarea de sembrar y cuidar nuestros propios árboles decorativos y frutales para venta a nuestros clientes. Los tenemos ya crecidos o en libre crecimiento para que decoren su hogar o su comercio."
                style={{
                    color: "var(--background)",
                    fontSize: "var(--font-xs)",
                    fontWeight: "200"
                }}
            />
        </Box>
    )
}
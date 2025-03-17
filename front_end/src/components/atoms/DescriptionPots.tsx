import { Box, Typography } from "@raul_yael/cleangui";
import { BtnHref } from "../moleculs/Button";

export function DescriptionPots(){
    return(
        <Box type="div"
             style={{
                width:"100%",
                border: "none",
                boxShadow: "none",
                background: "var(--green-200)",
                margin: 0,
                padding: "20px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap:"20px"
             }}
        >
            <Typography children="MACETAS" 
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: "var(--font-md)"
                        }}
            />

            <Typography children="En nuestra jardinería, sabemos que las macetas no solo sirven para cuidar tus plantas, sino también para embellecer tus espacios. Contamos con una amplia variedad de macetas en distintos materiales, tamaños y estilos, ideales para darle un toque natural y armonioso a tu hogar." 
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: "var(--font-xs)"
                        }}
            />

            <Box type="div"
                style={{
                    border: "none",
                    boxShadow: "none",
                    background: "var(--green-200)",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignSelf: "end",
                    gap: '20px'
             }}
            >  

                <BtnHref link="#" text="Ver más"
                        weight={100}
                        sxText="var(--font-sm)"
                />
                <BtnHref link="#" text="Compra una maceta" 
                    weight={600} 
                    sxText="var(--font-xs)"
                    style={{
                        color:"var(--green)",

                    }}
                    />
            </Box> 
        </Box>
    )
}
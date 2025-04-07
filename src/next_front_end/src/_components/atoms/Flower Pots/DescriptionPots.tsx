import { Box, Typography } from "@raul_yael/cleangui";
import { BtnHref } from "../../moleculs/Button";

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
                justifyContent: "space-between",
                alignItems: "center",
                gap:"20px"
            }}
        >
            <Typography 
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: "var(--font-md)",
                            justifySelf: "start",
                        }}
            >
                MACETAS
            </Typography>

            <Typography 
                        style={{
                            color: "var(--white-peristance-color)",
                            fontSize: "var(--font-xs)"
                        }}
            >
                En nuestra jardinería, sabemos que las macetas no solo sirven para cuidar tus plantas, sino también para embellecer tus espacios. Contamos con una amplia variedad de macetas en distintos materiales, tamaños y estilos, ideales para darle un toque natural y armonioso a tu hogar.
            </Typography>

            <Box type="div"
                id="Btn_container"
            >  

                <BtnHref link="#" text="Ver más"
                        weight={100}
                        sxText="var(--font-xs)"
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
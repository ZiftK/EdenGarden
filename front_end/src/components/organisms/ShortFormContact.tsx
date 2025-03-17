import { Typography } from "@raul_yael/cleangui";
import Input from "../moleculs/Input";
import {  BtnOutlined } from "../moleculs/Button";

export function ShortFormContact(){
    return (
        <section             
        style={{
            marginTop: "100px",
            backgroundColor: "var(--background)",
            display: "grid",
            gridTemplateAreas:`
                "title title"
                "name phone"
                "email service"
                "message message"
                "button button"
            `,
            gridTemplateColumns: "140px 140px",
            gridTemplateRows: "repeat(3, 1fr) 2fr auto",
            gridColumnGap: "10px",
            gridRowGap: "10px",
            padding:"20px",   
            placeContent: "center",
            height:"320px"
        }}>
            <Typography 
                children="Mantenganse en Contacto"
                variant="h2"
                style={{
                    fontSize:"var(--font-lg)",
                    color:"var(--father-font)",
                    gridArea: "title",
                    width: "100%",
                    placeSelf: "center"
                }}
                />

            <Input 
                variant="default"
                bg="#E5ECE2"
                color="#BBC3B8"
                $colorNoFocus="#E5ECE2"
                $lightnessFactor={30}
                label="Nombre"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "name",
                    margin: 0,
                }}
            />

            <Input
                bg="#E5ECE2"
                color="#bbb" 
                variant="default"            
                $colorNoFocus="#CADEC2"
                $lightnessFactor={60}
                label="Telefono"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "phone",
                    margin: 0,
                }}
            />

            <Input 
                bg="#E5ECE2"
                color="#bbb"
                variant="default"
                $colorNoFocus="#CADEC2"
                $lightnessFactor={60}
                label="Email"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "email",
                    margin: 0,
                }}
            />

            <Input 
                bg="#E5ECE2"
                color="#bbb"
                variant="default"
                $colorNoFocus="#CADEC2"
                $lightnessFactor={60}
                label="Tipo de servicio"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "service",
                    margin: 0,
                }}
            />

            <Input 
                bg="#E5ECE2"
                color="#bbb"
                variant="default"
                $colorNoFocus="#CADEC2"
                $lightnessFactor={60}
                label="Mensaje..."
                $width="200%"
                $sxText={0.875}
                style={{
                    gridArea: "message",
                    margin: 0,
                    height: "80%",
                }}
            />

            <BtnOutlined text="Enviar mensaje" 
                style={{
                    fontSize: 'var(--font-xs)',
                    gridArea: "button",
                    padding: "3px 5ps",
                    height: "24px",
                    width:"130px",
                    placeSelf: "end",
                    alignSelf: "start"
                }}
            />
        </section>
    )
}
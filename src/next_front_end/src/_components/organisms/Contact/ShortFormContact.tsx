import { Typography } from "@raul_yael/cleangui";
import Input from "../../moleculs/Input";
import {  BtnOutlined } from "../../moleculs/Button";
import "./ShortFormContact.css"

export function ShortFormContact(){
    return (
        <section       
            id="contact_form"
        >
            <Typography                 
                variant="h2"
                style={{
                    fontSize:"var(--font-lg)",
                    color:"var(--father-font)",
                    gridArea: "title",
                    width: "100%",
                    placeSelf: "center"
                }}
            > 
                <span>Contáctenos</span>
            </Typography>

            <Input 
                variant="default"
                bg="#00000000"
                $colorNoFocus="#00000000"
                color="#8e988a98"
                $lightnessFactor={100}
                label="Nombre"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "name",
                    margin: 0,
                }}
            />

            <Input
                color="#8e988a98"
                bg="#00000000"
                $colorNoFocus="#00000000"
                variant="default"            
                $lightnessFactor={40}
                label="Telefono"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "phone",
                    margin: 0,
                }}
            />

            <Input 
                color="#8e988a98"
                variant="default"
                bg="#00000000"
                $colorNoFocus="#00000000"
                $lightnessFactor={40}
                label="Email"
                $width="100%"
                $sxText={0.875}
                style={{
                    gridArea: "email",
                    margin: 0,
                }}
            />

            <Input 
                color="#8e988a98"
                variant="default"
                bg="#00000000"
                $colorNoFocus="#00000000"
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
                variant="default"
                color="#8e988a98"
                bg="#00000000"
                $colorNoFocus="#00000000"
                $lightnessFactor={0}
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
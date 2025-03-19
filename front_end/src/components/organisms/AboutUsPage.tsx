import { Box, Typography } from "@raul_yael/cleangui";
import { InfoCard } from "../atoms/InfoCard";
import { StoreIcon } from "../atoms/Icons/Icons";

export function AboutUs(){
    return(
        <Box type="section"
            style={{
                padding:'20px',
                margin:0,
                backgroundColor: "transparent",
                boxShadow:"none",
                border: 'none',
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: '20px'
            }}
        >

            {/* Title  */}
            <Typography style={{
                color: 'var(--father-font)',
                fontSize:'var(--font-lg)',
                width: 'clamp(320px, 100%, 800px)',
                margin: '0 auto',
                textAlign: 'start'
            }}>
                Que es Eden Garden
            </Typography>

            {/* Description  */}

            <Typography 
                variant="h2"
                style={{
                    color: 'var(--children-font)',
                    fontSize:'var(--font-xs)',
                    margin: '0 auto',
                    marginTop:'4px',
                    width: 'clamp(320px, 100%, 800px)'
            }}>
            Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio.
            </Typography>

            <InfoCard 
                title="Que esperar de nosotros"
                description="Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio."
                icon={StoreIcon({size:[1.25,1.25]})}
                />

            <InfoCard 
                title="Nuestro Equipo"
                description="El equipo de Eden Garden concentra una amplia variedad de habilidades en el manejo de jardines. Cada miembro del equipo sabe que la satisfacción del cliente es lo más importante para lograr un resultado espectacular para usted y sus visitas."
                icon={StoreIcon({size:[1.25,1.25]})}
                />

            <InfoCard 
                title="Que esperar de nosotros"
                description={
                    <ul style={{marginLeft: '20px'}}>
                        <li>Ofrecer un alto estándar de calidad al cliente</li>
                        <li>Proporcionar productos de calidad en los diseños</li>
                        <li>Atender todos los puntos de vista del cliente</li>
                        <li>Brindar precios competitivos por nuestro trabajo</li>
                    </ul>
                }
                icon={StoreIcon({size:[1.25,1.25]})}
                />
        </Box>
    )
}
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
                border: 'none'
            }}
        >

            {/* Title  */}
            <Typography style={{
                color: 'var(--father-font)',
                fontSize:'var(--font-lg)',

            }}>
                Que es Eden Garden
            </Typography>

            {/* Description  */}

            <Typography 
                variant="h2"
                style={{
                    color: 'var(--children-font)',
                    fontSize:'var(--font-xs)',
                    marginTop:'4px'
            }}>
            Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio.
            </Typography>

            <InfoCard 
                title="Que esperar de nosotros"
                description="Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio."
                icon={StoreIcon({size:[1.25,1.25]})}
                />

            <InfoCard 
                title="Que esperar de nosotros"
                description="Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio."
                icon={StoreIcon({size:[1.25,1.25]})}
                />

            <InfoCard 
                title="Que esperar de nosotros"
                description="Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio."
                icon={StoreIcon({size:[1.25,1.25]})}
                />
        </Box>
    )
}
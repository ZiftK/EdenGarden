import { Box, Typography } from "@raul_yael/cleangui";

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
                fontSize:'17px',

            }}>
                Que es Eden Garden
            </Typography>

            {/* Description  */}

            <Typography style={{
                color: 'var(--children-font)',
                fontSize:'11.5px',
                marginTop:'4px'
            }}>
            Un equipo de trabajo dedicado a brindarle el servicio en jardinería y cascadas artificiales de excelencia y siempre al mejor precio.
            </Typography>
        </Box>
    )
}
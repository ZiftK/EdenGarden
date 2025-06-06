import { Box, Typography } from "@raul_yael/cleangui";
import { JSX } from "react";

export function InfoCard({
    title,
    description,
    icon
}:{
    title: string,
    description: string | JSX.Element,
    icon: JSX.Element
}){
    return(
        <Box as="div"
            style={{
                border: 'none',
                boxShadow: "none",
                backgroundColor: "transparent",
                margin: '0 auto',
                marginTop:'1.5rem',
                padding: 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                gap: '0.5rem',
                width: 'clamp(300px, 100%, 800px)'
            }}>
        
        {icon}

        <Box as="div"
            style={{
                border: 'none',
                boxShadow: "none",
                backgroundColor: "transparent",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: '.25rem',
                margin: 0,
            }}>


            <Typography as="h3"
                style={{
                    color: "var(--father-font)",
                    fontSize: "var(--font-md)",
                    margin: 0,
                    lineHeight: "20px"
                }}>
                {title}
            </Typography>




            <Box as="span"
                style={{
                    backgroundColor: "transparent",
                    border: 'none',
                    color: "var(--children-font)",
                    fontSize: "var(--font-xs)",
                    width: '95%',
                }}>
                {description}
            </Box>

            </Box>

        </Box>
    )
}
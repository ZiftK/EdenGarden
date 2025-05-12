import { Box, Typography } from "@raul_yael/cleangui";

export function CardFrutal({
    title,
    description
}:{
    title: string,
    description: string
}){
    return(
        <Box as="div"
            className=""
            style={{
                border: "10px solid var(--background)",
                boxShadow: "none",
                background: "var(--background-transparent)",
                borderRadius:"20px",
                margin: `130px 0px 0px 20px`,
                padding: "18px 50px 18px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width:"250px",
                backdropFilter: "blur(50px)",
                alignSelf: "start"
            }}
        >
            <Typography 
                as="h2"        
                style={{
                    color: "var(--white-peristance-color)",
                    fontSize: "var(--font-md)",
                    fontWeight: "600"
                }}
            > 
                {title}
            </Typography>

            <Typography 
                as="p"            
                style={{
                    color: "var(--white-peristance-color)",
                    fontSize: "var(--font-xs)",
                    fontWeight: "300"
                }}
            > 
                {description}
            </Typography>
        </Box>
    )
}
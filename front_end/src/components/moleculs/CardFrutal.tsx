import { Box, Typography } from "@raul_yael/cleangui";

export function CardFrutal({
    title,
    description
}:{
    title: string,
    description: string
}){
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
                children = {title}
                style={{
                    color: "var(--background)",
                    fontSize: "var(--font-md)",
                    fontWeight: "600"
                }}
            />

            <Typography 
                variant="p"
                children = {description}
                style={{
                    color: "var(--background)",
                    fontSize: "var(--font-xs)",
                    fontWeight: "200"
                }}
            />
        </Box>
    )
}
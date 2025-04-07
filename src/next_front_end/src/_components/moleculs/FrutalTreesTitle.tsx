import {Typography} from "@raul_yael/cleangui"

export function FrutalTreesTitle({title}:{title: string}){
    return(
        <Typography             
            variant="h2"
            style={{
                color: "var(--orange-title)",
                fontWeight: 500,
                padding: "10px 20px 10px 70px",
                borderRadius:"0px 0px 0px 50px",
                backgroundColor:"var(--background)",
                marginTop:"70px",
                placeSelf: "center",
                fontSize: "var(--font-md)",
                alignSelf: "end",
            }}
        > 
            {title}
        </Typography>
    )
}
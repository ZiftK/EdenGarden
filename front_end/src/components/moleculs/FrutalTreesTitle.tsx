import {Typography} from "@raul_yael/cleangui"

export function FrutalTreesTitle({title}:{title: string}){
    return(
        <Typography 
            children={title}
            variant="h2"
            style={{
                color: "var(--orange-title)",
                fontWeight: 500,
                padding: "10px 70px",
                borderRadius:"50px",
                backgroundColor:"var(--background)",
                marginTop:"70px",
                marginLeft:"190px",
                placeSelf: "center",
                fontSize: "var(--font-md)"
            }}
        />
    )
}
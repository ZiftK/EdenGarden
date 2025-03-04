import { Button } from "@raul_yael/cleangui";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const theme = {
    colors:{
        primary: "var(--green-light)",
        secondary: "var(--green-dark-transparent-100)",
        background: "var(--background)"
    }
}

type ThemeColors = keyof typeof  theme.colors;



export function BtnOutlined({ text }: { text: string }){
    return  (
        <Button variant="outlined"
                size="medium"
                style={{
                    color: "var(--green-light)", 
                    backgroundColor: "var(--green-dark-transparent-100)",
                    fontSize: "14px",
                }}
                >
            {text}
        </Button>
    )
}

export function BtnFilled({ text, col }: { text: string, col?: ThemeColors | string  }){
    return  (
        <Button variant="filled"
                style={{
                    color: col || "var(--green-light)", 
                    backgroundColor: "var(--background)",
                    fontSize: "14px",
                }}
                >
            {text}
        </Button>
    )
}

export function BtnHref({text, link, weight, sxText}: {text: string, link: string, weight?: number, sxText?: number}){
    return (
        <a href={link} style={{ textDecoration: 'none' }}>
        <Button variant="text"
                style={{
                    color: "var(--green-light)", 
                    backgroundColor: "var(--background)",
                    fontSize: sxText ? `${sxText}px` :"14px",
                    fontWeight: weight ? `${weight}` : "lighter",                    
                }}
        >
          {text}
        </Button>
      </a>
    )
}
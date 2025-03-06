import { Button } from "@raul_yael/cleangui";
import { ReactElement } from "react";

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

export function BtnFilled({ text, col, onClick, $bg, children }: 
    { 
        text?: string, 
        col?: ThemeColors | string, 
        onClick: () => void   
        $bg?: string
        children?:ReactElement
    }){
    return  (
        <Button variant="filled"
                onClick={onClick}
                style={{
                    color: col || "var(--green-light)", 
                    backgroundColor: $bg || 'transparent',
                    fontSize: "14px",
                    margin: 0                    
                }}
                >
            <span>{text}</span>
            {children}
        </Button>
    )
}

export function BtnHref({text, link, weight, sxText}: 
                        {
                            text: string, 
                            link: string, 
                            weight?: number, 
                            sxText?: number,                            
                        }){
    return (
        <a href={link} style={{ textDecoration: 'none' }}>
        <Button variant="text"
                
                style={{

                    color: "#EAF2E7", 
                    backgroundColor: "transparent",
                    fontSize: sxText ? `${sxText}px` :"14px",
                    fontWeight: weight ? `${weight}` : "lighter"                   
                }}
        >
          {text}
        </Button>
      </a>
    )
}
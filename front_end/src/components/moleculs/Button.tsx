import { Button, Typography } from "@raul_yael/cleangui";
import { CSSProperties, JSX, ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const theme = {
    colors:{
        primary: "var(--green-light)",
        secondary: "var(--green-dark-transparent-100)",
        background: "var(--background)"
    }
}

type ThemeColors = keyof typeof  theme.colors;



export function BtnOutlined({ text, style, $bg }: { text: string, style?: CSSProperties, $bg?: string }){
    return  (
        <Button variant="outlined"
                size="medium"
                style={{
                    margin:0,
                    color: "var(--green-light)", 
                    fontSize: "12px",
                    backgroundColor: $bg||"var(--green-dark-transparent-100)",
                    backdropFilter: 'blur(10px)',
                    padding: '4px 12px',
                    ...style,
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
                    fontSize: "12px",
                    margin: 0,
                    padding: '4px 12px'         
                }}
                >
            <span>{text}</span>
            {children}
        </Button>
    )
}

export function BtnHref({text, link, weight, sxText, style, icon}: 
                        {
                            text: string, 
                            link: string, 
                            weight?: number, 
                            sxText?: string,  
                            style?: CSSProperties    
                            icon?: JSX.Element                      
                        }){
    return (
        <a href={link} style={{ textDecoration: 'none', width: "auto"}}>
        <Button variant="text"
                icon={icon && icon}
                style={{
                    color: "#EAF2E7", 
                    backgroundColor: "transparent",
                    margin:0,
                    padding:0,
                    ...style,
                }}
        >
{          <Typography 
            children={text}
            variant="p"
            style={{
                fontFamily:"Montserrat",
                fontWeight: weight || 100,
                fontSize: sxText || "1rem"
            }}
            />}
        </Button>
      </a>
    )
}
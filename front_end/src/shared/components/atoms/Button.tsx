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



export function BtnOutlined({ 
        text, 
        style, 
        $bg,
        onClick,
        className
    } : { 
        text: string, 
        style?: CSSProperties, 
        $bg?: string,
        onClick?: (e: React.MouseEvent<HTMLButtonElement> ) => void,
        className?: string
    }){
    return  (
        <Button variant="outlined"
                onClick={onClick}
                size="medium"
                style={{
                    margin:0,
                    color: "var(--green-light)", 
                    fontSize: "12px",
                    backgroundColor: $bg||"var(--green-dark-transparent-100)",
                    backdropFilter: 'blur(10px)',
                    padding: '5px 26px',
                    border: '1px solid var(--green-light)',
                    ...style,
                }}
                className={className}
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

export function BtnHref({text, link, weight, sxText, style, $Icon, $IconStyle, className}: 
                        {
                            text: string, 
                            link: string, 
                            weight?: number, 
                            sxText?: string,  
                            style?: CSSProperties    
                            $Icon?: JSX.Element,
                            $IconStyle?: string,
                            className?: string                   
                        }){
                        
    return (
        <a href={link} 
            className={className}
            style={{ textDecoration: 'none', width: "auto"}}>

                {$Icon &&
                <div className={$IconStyle}>
                    {$Icon}
                </div>
                }

                <Button variant="text"                    
                        style={{
                            color: "#EAF2E7", 
                            backgroundColor: "transparent",
                            margin:0,
                            padding:0,
                            ...style,
                        }}
                        >
                    <Typography         
                        as="p"
                        style={{
                            fontFamily:"Montserrat",
                            fontWeight: weight || 100,
                            fontSize: sxText || "1rem",
                            ...style
                        }}
                        >
                        {typeof text === "string" ? text : ""}
                    </Typography>
                </Button>
        </a>
    )
}

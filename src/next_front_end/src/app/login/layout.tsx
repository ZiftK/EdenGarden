import React from "react"
import img from "@/public/assets/icons/Logo_Eden_Icon.png"

export default function loginLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    return(
        <html lang="es" suppressHydrationWarning={true} >
            <head>
                <link rel="icon" href={img.src}/>
                <meta name="color-scheme" content="light dark" />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
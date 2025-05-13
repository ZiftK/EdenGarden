import React from "react"
import { Montserrat } from "next/font/google"
import img from "@/public/assets/icons/Logo_Eden_Icon.png"

const montSains = Montserrat({
    variable: "--font-mont-sains",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

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
            <body className={montSains.className}>
                {children}
            </body>
        </html>
    )
}
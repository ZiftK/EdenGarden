import React from "react"

export default function loginLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    return(
        <html lang="es" suppressHydrationWarning >
            <head>
                <link rel="icon" href="/Logo_Eden_Icon.png" />
                <meta name="color-scheme" content="light dark" />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
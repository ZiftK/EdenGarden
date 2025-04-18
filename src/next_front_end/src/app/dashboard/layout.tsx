import { getServerUser } from '@/src/shared/lib/auth/getServerUser'
import HydrateZustandProvider from '@/src/shared/providers/HydrateZustandProvider'
import { redirect } from 'next/navigation';
import img from "@/public/assets/icons/Logo_Eden_Icon.png"

export default async function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    const user = await getServerUser()

    // if(!user) redirect("/login")

    return(
        <html lang="es" suppressHydrationWarning={true} >
            <head>
                <link rel="icon" href={img.src} />
                <meta name="color-scheme" content="light dark" />
            </head>
            <body>
                <HydrateZustandProvider user={user}> 
                    {children}
                </HydrateZustandProvider>            
            </body>
        </html>
    )
}
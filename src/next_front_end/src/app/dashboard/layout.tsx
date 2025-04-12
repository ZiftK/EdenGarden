import { getServerUser } from '@/src/shared/lib/auth/getServerUser'
import HydrateZustandProvider from '@/src/shared/providers/HydrateZustandProvider'
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>){
    const user = await getServerUser()

    if(!user){
        redirect("auth/login")
    }

    return(
        <html lang="es" suppressHydrationWarning >
            <head>
                <link rel="icon" href="/Logo_Eden_Icon.png" />
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
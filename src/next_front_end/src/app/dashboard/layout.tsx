import { getServerUser } from '@/src/shared/lib/auth/getServerUser'
import HydrateZustandProvider from '@/src/shared/providers/HydrateZustandProvider'
import Calendar from "@/src/components/ERP/moleculs/Calendar/Calendar"
import ResponsiveMenu from "@/src/components/ERP/organisms/ResponsiveMenu"
import { redirect } from 'next/navigation';
import img from "@/public/assets/icons/Logo_Eden_Icon.png"
import MeetsDay from '@/src/features/Meets/ui/MeetsDay'
import InfoUser from '@/src/components/ERP/moleculs/InfoUser'

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
                    <div className="grid grid-cols-1 grid-rows-[55px_100px_125_1fr] md:h-dvh md:max-w-[700px] md:mx-auto md:grid-cols-[1fr_350px]  xl:max-w-full xl:grid-cols-[200px_1fr_250px] xl:grid-rows-[55px_250px_1fr]  min-h-full xl:pt-2 pt-20 px-2  gap-4 py-4">
                        <ResponsiveMenu />
                        <InfoUser user={user} />
                        <Calendar />
                        <MeetsDay />
                        {children}
                    </div>
                </HydrateZustandProvider>            
            </body>
        </html>
    )
}
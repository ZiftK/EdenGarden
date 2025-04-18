import { getServerUser } from "@/src/shared/lib/auth/getServerUser";
import DashboardShell from "@/src/features/auth/dashboard/DashboardShell";


export default async function DashboardPage() {
    const user =  await getServerUser()
    // if (!user) return null
    
    return <DashboardShell  dehydratedState={ {user}} />
}
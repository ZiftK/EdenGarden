import { getServerUser } from "@/src/shared/lib/auth/getServerUser";
import { redirect } from "next/navigation";
import DashboardShell from "@/src/features/auth/dashboard/DashboardShell";

export default async function DashboardPage() {
    const user =  await getServerUser()
    
    if(!user) redirect("/auth/login")
    
    return <DashboardShell  dehydratedState={ {user}} />
}
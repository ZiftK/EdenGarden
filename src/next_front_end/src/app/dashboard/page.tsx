import DashboardShell from "@/src/features/auth/dashboard/DashboardShell";


export default async function DashboardPage(user: any) {
    // if (!user) return null
    return <DashboardShell  dehydratedState={ {user}} />
}
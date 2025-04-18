import ResponsiveMenu from "@/src/components/ERP/organisms/ResponsiveMenu"
import { Employee } from "@/src/shared/types"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: Employee}
}){

    return (
        <div className="flex flex-col gap-4">
            <ResponsiveMenu />
            <h1>Dashboard</h1>
            <p>Bienvenido </p>
        </div>
    )
}   
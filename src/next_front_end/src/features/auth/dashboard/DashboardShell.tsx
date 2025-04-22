import InfoUser from "@/src/components/ERP/moleculs/InfoUser"
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
            <InfoUser user={dehydratedState.user} />
        </div>
    )
}   
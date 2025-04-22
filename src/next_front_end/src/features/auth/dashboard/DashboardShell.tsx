import Calendar from "@/src/components/ERP/moleculs/Calendar/Calendar"
import InfoUser from "@/src/components/ERP/moleculs/InfoUser"
import ResponsiveMenu from "@/src/components/ERP/organisms/ResponsiveMenu"
import { Employee } from "@/src/shared/types"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: Employee}
}){

    return (
        <>
        <ResponsiveMenu />
        <div className="flex flex-col gap-4 p-5">
            <InfoUser user={dehydratedState.user} />
            <Calendar />
        </div>
        </>
    )
}   
import InfoUser from "@/src/components/ERP/moleculs/InfoUser"
import { Employee } from "@/src/shared/types"
import Resources from "@/src/entities/current_resources/ui/Resoruces"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: Employee}
}){

    return (
        <>
            
            <InfoUser user={dehydratedState.user} />
            <Resources />
        </>
    )
}   
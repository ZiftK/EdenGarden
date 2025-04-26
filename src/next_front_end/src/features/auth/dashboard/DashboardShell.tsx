import Calendar from "@/src/components/ERP/moleculs/Calendar/Calendar"
import InfoUser from "@/src/components/ERP/moleculs/InfoUser"
import ResponsiveMenu from "@/src/components/ERP/organisms/ResponsiveMenu"
import { Employee } from "@/src/shared/types"
import MeetsDay from "../../Meets/ui/MeetsDay"
import Resources from "@/src/entities/current_resources/ui/Resoruces"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: Employee}
}){

    return (
        <>
        <ResponsiveMenu />
        <div className="grid grid-cols-1 md:grid-cols-[1fr, 350px] lg:grid-cols-[250px, 1fr, 250px] lg:pt-5 pt-20  gap-4 p-5">
            <InfoUser user={dehydratedState.user} />
            <Calendar />
            <MeetsDay />
            <Resources />
        </div>
        </>
    )
}   
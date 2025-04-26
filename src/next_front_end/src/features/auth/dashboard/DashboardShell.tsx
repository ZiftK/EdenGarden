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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] lg:grid-cols-[200px_1fr_250px] lg:grid-rows-[55px_250px_1fr]  min-h-full lg:pt-2 pt-20  gap-4 pr-5 pl-2 py-4">
            <ResponsiveMenu />
            <InfoUser user={dehydratedState.user} />
            <Calendar />
            <MeetsDay />
            <Resources />
        </div>
    )
}   
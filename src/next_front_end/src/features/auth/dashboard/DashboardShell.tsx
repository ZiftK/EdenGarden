import { Employee } from "@/src/shared/types"
import Resources from "@/src/entities/current_resources/ui/Resoruces"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: Employee}
}){

    return (
        <>
            <Resources />
        </>
    )
}   
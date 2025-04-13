import { User } from "@/src/shared/types"


export default function DashboardShell({
    dehydratedState
}: {
    dehydratedState: {user: User}
}){

    return (
        <div className="flex flex-col gap-4">
            <h1>Dashboard</h1>
            <p>Bienvenido {dehydratedState.user.expedient}</p>
        </div>
    )
}

import { updateTeam } from "../api/updateTeams"
import { dataTeam } from "../types/types"

export const handleSaveTeam = async (
    data: dataTeam,
    setData: React.Dispatch<React.SetStateAction<dataTeam>>,
    reset: () => void,
) => {
    if(data.teamShowed?.members.length === 0 ) {
        alert("Puede borrar el equipo, mas no dejarlo vacio")
        return reset()
    }
    console.log(data.teamShowed.members)
    if(data.teamShowed.members === data.currentTeam.members) return reset()

    updateTeam(data.currentTeam.name, data.currentTeam.members)
    setData((prev) => ({
        ...prev,
        currentTeam: {
            ...prev.currentTeam!,
            name:  data.teamChanged!.name,
            members: data.teamChanged?.members?.map((member) => ({
                ...member,
                teams: data.currentTeam?.name
            })) || [],
        leader: {
            ...prev.teamChanged!.leader,
            teams: data.teamChanged!.name,
        }
        }
    }))
    reset()
}

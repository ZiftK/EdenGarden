
import { updateTeam } from "../../api/updateTeams"
import { dataTeam } from "../../types/types"

export const handleSaveTeam = async (
    data: dataTeam,
    setData: React.Dispatch<React.SetStateAction<dataTeam>>,
    reset: () => void
) => {
    if (data.teamShowed?.members.length === 0) {
        alert("Puede borrar el equipo, mas no dejarlo vacío")
        return reset()
    }

    if (data.teamShowed.members === data.currentTeam.members) return reset()

    await updateTeam(data.currentTeam.name, data.teamShowed.members)

    setData((prev) => ({
        ...prev,
        isEditing: false,
        currentTeam: {
            ...prev.currentTeam,
            members: prev.teamShowed.members || prev.currentTeam.members,
        },
        teamChanged: [],
    }))
}

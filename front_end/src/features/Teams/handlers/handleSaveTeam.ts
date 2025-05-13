
import { updateTeam } from "../api/updateTeams"
import { dataTeam } from "../types/types"

export const handleSaveTeam = async (
    data: dataTeam,
    setData: React.Dispatch<React.SetStateAction<dataTeam>>,
    reset: () => void,
) => {
    // console.log("data", data)
    if(data.teamShowed?.members.length === 0 ) {
        alert("Puede borrar el equipo, mas no dejarlo vacio")
        return reset()
    }
    if(data.teamShowed.members === data.currentTeam.members) return reset()

    updateTeam(data.currentTeam.id, data.currentTeam.members)
    setData((prev) => ({
        ...prev,
        isEditing: false,
        currentTeam: {
            ...prev.currentTeam!,
            members: data.teamShowed?.members?.map((member) => ({
                ...member,
                teams: data.currentTeam?.name
            })) || [],},
        teamShowed: {
            ...prev.currentTeam!,
            members: data.teamShowed?.members?.map((member) => ({
                ...member,
                teams: data.currentTeam?.name
            })) || []},
        teamChanged: {
            id: '',
            name: '',
            leader: {
                name: '',
                id: '',
                email: '',
                phone_number: '',
                role: 'leader',
                position: '',
                salary: 0,
            },
            members: [],
        }}
        ))
    // reset()
}

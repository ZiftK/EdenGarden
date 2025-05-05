import { dataTeam } from "../../types/types"


export const handleToggleRemove = (data: dataTeam): dataTeam => {
    const idToRemove = new Set(data.teamChanged?.members.map((m) => m.id))
    const updatedMembers = data.currentTeam.members.filter((m) => !idToRemove.has(m.id))
    console.log("updatedMembers", data.teamChanged)

    return {
        ...data,
        teamShowed: {
            ...data.teamShowed,
            members: updatedMembers,
        },
        teamChanged: undefined,
    }
}

import { dataTeam } from "../types/types"


export const handleToggleRemove = (data: dataTeam): dataTeam => {
    const idToRemove = new Set(data.teamChanged?.members.map((m) => m.id))
    const updatedMembers = data.teamShowed.members.filter((m) => !idToRemove.has(m.id))

    return {
        ...data,
        teamShowed: {
            ...data.teamShowed,
            members: updatedMembers,
        },
        teamChanged: {
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
        },
    }
}

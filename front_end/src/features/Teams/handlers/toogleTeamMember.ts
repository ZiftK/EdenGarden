import { Employee } from "@/src/shared/types"
import { dataTeam } from "../types/types"

export const toggleTeamMember = (
    state: dataTeam,
    user: Pick<Employee, 'email' | 'id' | 'name' | 'phone_number' | 'role' | 'position' | 'salary'>,
    checked: boolean
    ): dataTeam => {
    const teamChanged = state.teamChanged;
    
    if (!teamChanged) return state;
    
    let updatedMembers;
    if (checked) {
        const exists = teamChanged.members.some(member => member.id === user.id);
        updatedMembers = exists ? teamChanged.members : [...teamChanged.members, user];
    } else {
        updatedMembers = teamChanged.members.filter(member => member.id !== user.id);
    }
    
    return {
        ...state,
        teamChanged: {
            ...teamChanged,
            members: updatedMembers,
        },
    };
};
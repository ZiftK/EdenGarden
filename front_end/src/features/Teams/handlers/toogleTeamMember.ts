import { Employee } from "@/src/shared/types"
import { dataTeam } from "../types/types"

export const toggleTeamMember = (
    state: dataTeam,
    user: Pick<Employee,'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' >,
    checked: boolean
    ): dataTeam => {
    const teamChanged = state.teamChanged;
    
    if (!teamChanged) return state;
    
    let updatedMembers;
    if (checked) {
        const exists = teamChanged.empleados.some(member => member.id_empleado === user.id_empleado);
        updatedMembers = exists ? teamChanged.empleados : [...teamChanged.empleados, user];
    } else {
        updatedMembers = teamChanged.empleados.filter(member => member.id_empleado !== user.id_empleado);
    }
    
    return {
        ...state,
        teamChanged: {
            ...teamChanged,
            empleados: updatedMembers,
        },
    };
};
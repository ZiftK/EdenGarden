import { dataTeam } from "../types/types"


export const handleToggleRemove = (data: dataTeam): dataTeam => {
    const idToRemove = new Set(data.teamChanged?.empleados.map((m) => m.id_empleado))
    const updatedMembers = data.teamShowed.empleados.filter((m) => !idToRemove.has(m.id_empleado))

    return {
        ...data,
        teamShowed: {
            ...data.teamShowed,
            empleados: updatedMembers,
        },
        teamChanged: {
            nombre: '',
            id_equipo: 0,
            lider: {
                nombre: '',
                id_empleado: 0,
                email: '',
                telefono: '',
                rol: 'leader',
                puesto: '',
                salario: 0,
            },
            empleados: [],
        },
    }
}

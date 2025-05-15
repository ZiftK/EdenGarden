
import { fetcher } from "@/src/shared/api/httpClient"
import { updateTeam } from "../api/updateTeams"
import { dataTeam } from "../types/types"
import { ShortTeam } from "@/src/shared/types"

export const handleSaveTeam = async (
    data: dataTeam,
    setData: React.Dispatch<React.SetStateAction<dataTeam>>,
    reset: () => void,
) => {
    // console.log("data", data)
    if(data.teamShowed?.empleados.length === 0 ) {
        alert("Puede borrar el equipo, mas no dejarlo vacio")
        return reset()
    }
    if(data.teamShowed.empleados === data.currentTeam.empleados) return reset()

    updateTeam(data.currentTeam.id_equipo, data.currentTeam.empleados)
    setData((prev) => ({
        ...prev,
        isEditing: false,
        currentTeam: {
            ...prev.currentTeam!,
            empleados: data.teamShowed?.empleados?.map((member) => ({
                ...member,
                teams: data.currentTeam?.nombre
            })) || [],},
        teamShowed: {
            ...prev.currentTeam!,
            empleados: data.teamShowed?.empleados?.map((member) => ({
                ...member,
                teams: data.currentTeam?.nombre
            })) || []},
        teamChanged: {
        id_equipo: '',
        nombre: '',
        lider: {
            nombre: '',
            id_empleado: '',
            email: '',
            telefono: '',
            rol: "leader" as 'leader',
            puesto: '',
            salario: 0,
        },
        empleados: [],
            },
            empleados: [],
    }))

    // try{
    //     const teamModified = fetcher.post<ShortTeam>()
    // }
    // reset()
}

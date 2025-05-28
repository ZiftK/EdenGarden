import { fetcher } from "@/src/shared/api/httpClient"
import { endpoints } from "@/src/shared/api/endpoints"
import { dataTeam } from "../types/types"

export const handleSaveTeam = async (
    data: dataTeam,
    setData: React.Dispatch<React.SetStateAction<dataTeam>>,
    reset: () => void,
) => {
    try {
        if (!data.teamChanged) {
            return reset()
        }

        // Verificar si hay cambios
        const hasNameChanged = data.teamChanged.nombre !== data.currentTeam.nombre
        const hasLeaderChanged = data.teamChanged.lider.id_empleado !== data.currentTeam.lider.id_empleado
        const hasMembersChanged = JSON.stringify(data.teamChanged.empleados) !== JSON.stringify(data.currentTeam.empleados)

        if (!hasNameChanged && !hasLeaderChanged && !hasMembersChanged) {
            return reset()
        }

        const teamId = data.currentTeam.id_equipo

        // Actualizar nombre si cambió
        if (hasNameChanged) {
            console.log('Actualizando nombre:', {
                teamId,
                nombre: data.teamChanged.nombre
            })
            await fetcher.put(`${endpoints.teamUpdateName}/${teamId}`, {
                nombre: data.teamChanged.nombre
            })
        }

        // Actualizar líder si cambió
        if (hasLeaderChanged) {
            console.log('Actualizando líder:', {
                teamId,
                lider_id: data.teamChanged.lider.id_empleado
            })
            await fetcher.put(`${endpoints.teamUpdateLeader}/${teamId}`, {
                lider_id: data.teamChanged.lider.id_empleado
            })
        }

        // Actualizar miembros si cambiaron
        if (hasMembersChanged) {
            if (data.teamChanged.empleados.length === 0) {
                alert("No puedes dejar el equipo sin miembros")
                return reset()
            }

            const memberIds = data.teamChanged.empleados.map(emp => emp.id_empleado)
            console.log('Actualizando miembros:', {
                teamId,
                empleados_ids: memberIds
            })
            await fetcher.put(`${endpoints.teamUpdateMembers}/${teamId}`, {
                empleados_ids: memberIds
            })
        }

        // Actualizar estado local
        const updatedTeam = { ...data.teamChanged }
        setData({
            isEditing: false,
            currentTeam: updatedTeam,
            teamShowed: updatedTeam,
            teamChanged: updatedTeam
        })

        alert("Cambios guardados exitosamente")
    } catch (error) {
        console.error("Error al guardar los cambios:", error)
        alert("Error al guardar los cambios")
        reset()
    }
}

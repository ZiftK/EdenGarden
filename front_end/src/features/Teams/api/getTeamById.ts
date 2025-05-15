import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { ShortTeam } from "@/src/shared/types"

export async function getTeamById(id: string): Promise<ShortTeam> {
    try{
        const dataTeam: ShortTeam = await fetcher.get<ShortTeam>(`${endpoints.team}/${id}`)
        if(!dataTeam)  throw new Error('No se encontraron equipos')
        return dataTeam
    } catch (error) {
        console.error('Error al obtener el equipo:', error)
        throw new Error('Error al obtener el equipo')
    }

}
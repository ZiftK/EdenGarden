import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { ShortTeam } from "@/src/shared/types"; 

export async function getTeams(): Promise<ShortTeam[]> {
    try{
        const dataTeams: ShortTeam[] = await fetcher.get(`${endpoints.teams}`)
        if(!dataTeams)  throw new Error('No se encontraron equipos')
            return dataTeams
    } catch (error) {
        console.error('Error al obtener los equipos:', error)
        throw new Error('Error al obtener los equipos')
    }
}

import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Project } from "../types"

export default async function getProjects(): Promise<Project[]> {
    try {
        const response = await fetcher.get<{proyectos: Project[]}>(`${endpoints.project}/all`)
        
        if (!response || !Array.isArray(response.proyectos)) {
            console.error('Respuesta inválida del servidor:', response)
            throw new Error('Formato de respuesta inválido')
        }
        
        return response.proyectos
    } catch (error) {
        console.error('Error al obtener los proyectos:', error)
        throw new Error('Error al obtener los proyectos')
    }
}
import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Project } from "./types"

export default async function getProjects(): Promise<Project[]> {
    try{
        const dataProjects: Project[] = await fetcher.get(`${endpoints.projects}`)
        if (!dataProjects) {
            throw new Error('No se encontraron proyectos')
        }
        return dataProjects
    } catch (error) {
        console.error('Error al obtener los proyectos:', error)
        throw new Error('Error al obtener los proyectos')
    }
    
}
import { fetcher } from "@/src/shared/api/httpClient"
import { Project } from "../types"
import { endpoints } from "@/src/shared/api/endpoints"

export async function getProjectById(id: string): Promise<Project> {
    try{
        const dataProjects: Project = await fetcher.get(`${endpoints.project}/${id}`)
        console.log('dataProjects', dataProjects)
        if (!dataProjects) throw new Error('No se encontraron proyectos')
        
        return dataProjects
    } catch (error) {
        console.error('Error al obtener los proyectos:', error)
        throw new Error('Error al obtener los proyectos')
    }
}
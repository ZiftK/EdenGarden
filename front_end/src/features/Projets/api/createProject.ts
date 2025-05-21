import { fetcher } from '@/src/shared/api/httpClient'
import { ProjectToCreate } from '../types'

export const createProject = async (project: ProjectToCreate) => {
    const response = await fetcher.post('/project/', project)
    return response.data?.project_id
}

export const deleteProject = async (projectId: number) => {
    await fetcher.delete(`/project/${projectId}`)
}

export const createProjectCalendar = async (projectId: number, calendar: any) => {
    await fetcher.post(`/project/${projectId}/calendar/create`, calendar)
}

export const deleteProjectCalendar = async (projectId: number) => {
    await fetcher.delete(`/project/${projectId}/calendar`)
}

export const uploadProjectImage = async (base64Image: string) => {
    const response = await fetcher.post('/project/upload-image', {
        base64_image: base64Image,
        folder: 'projects'
    })
    return response.data?.url
}

export const deleteProjectImage = async (projectId: number) => {
    await fetcher.delete(`/project/${projectId}/image`)
} 
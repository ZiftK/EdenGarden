import { fetcher } from '@/src/shared/api/httpClient'
import { ProjectToCreate } from '../types'

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

interface ProjectResponse {
    project_id: number;
}

interface ImageResponse {
    url: string;
}

export const createProject = async (project: ProjectToCreate): Promise<number> => {
    const response = await fetcher.post<ApiResponse<ProjectResponse>>('/project/', project)
    if (!response.data?.project_id) {
        throw new Error('Failed to create project')
    }
    return response.data.project_id
}

export const deleteProject = async (projectId: number): Promise<void> => {
    await fetcher.delete(`/project/${projectId}`)
}

export const createProjectCalendar = async (projectId: number, calendar: any): Promise<void> => {
    await fetcher.post(`/project/${projectId}/calendar/create`, calendar)
}

export const deleteProjectCalendar = async (projectId: number): Promise<void> => {
    await fetcher.delete(`/project/${projectId}/calendar`)
}

export const uploadProjectImage = async (projectId: number, base64Image: string): Promise<string> => {
    const response = await fetcher.post<ApiResponse<ImageResponse>>(`/project/${projectId}/image`, {
        base64_image: base64Image
    })
    if (!response.data?.url) {
        throw new Error('Failed to upload image')
    }
    return response.data.url
}

export const deleteProjectImage = async (projectId: number): Promise<void> => {
    await fetcher.delete(`/project/${projectId}/image`)
} 
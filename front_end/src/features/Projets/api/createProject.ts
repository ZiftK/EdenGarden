import { fetcher } from '@/src/shared/api/httpClient'
import { ProjectToCreate } from '../types'

interface ApiResponse {
    message: string;
    project_id: number;
}

interface ImageApiResponse {
    message: string;
    url: string;
}

export const createProject = async (project: ProjectToCreate): Promise<number> => {
    const response = await fetcher.post<ApiResponse>('/project', project)
    
    if (!response?.project_id) {
        throw new Error('Failed to create project')
    }
    return response.project_id
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
    const response = await fetcher.post<{success: boolean, image_url: string}>(`/project/${projectId}/image`, {
        base64_image: base64Image
    });
    
    if (!response?.image_url) {
        throw new Error('Failed to upload image');
    }
    
    await fetcher.patch<{message: string}>(`/project/${projectId}`, {
        img: response.image_url
    });
    
    return response.image_url;
}

export const deleteProjectImage = async (projectId: number): Promise<void> => {
    await fetcher.delete(`/project/${projectId}/image`)
} 
import { ClientToCreate } from '../types/client'
import { ProjectToCreate } from '../types'
import { ProjectCalendarToCreate } from '../types/calendario'
import { createClient, deleteClient } from '../api/createClient'
import { 
    createProject, 
    createProjectCalendar, 
    deleteProject, 
    deleteProjectCalendar, 
    uploadProjectImage,
    deleteProjectImage
} from '../api/createProject'

interface CreateProjectData {
    client: ClientToCreate;
    project: Omit<ProjectToCreate, 'cliente' | 'img'>;
    calendar?: ProjectCalendarToCreate;
    image?: string;
}

export const createNewProject = async (data: CreateProjectData) => {
    let clientId: number | null = null;
    let projectId: number | null = null;
    let imageUrl: string | null = null;

    try {
        // 1. Crear cliente
        try {
            clientId = await createClient(data.client);
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            throw new Error(error instanceof Error ? error.message : 'Error al crear el cliente');
        }

        // 2. Crear proyecto
        const projectData: ProjectToCreate = {
            ...data.project,
            cliente: clientId,
            estado: data.project.estado || 'PENDIENTE', // Aseguramos que siempre haya un estado
            img: '' // Placeholder, will be updated after image upload
        };

        try {
            projectId = await createProject(projectData);
            console.log('Datos enviados al crear proyecto:', projectData); // Para debugging
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            // Mejorar el mensaje de error para incluir detalles de validación
            if (error instanceof Error && 'response' in error) {
                const apiError = error as any;
                const detail = apiError.response?.data?.detail;
                throw new Error(`Error al crear el proyecto: ${detail || error.message}`);
            }
            throw error;
        }

        // 3. Subir imagen si existe
        if (data.image && projectId) {
            try {
                imageUrl = await uploadProjectImage(projectId, data.image);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                throw new Error(error instanceof Error ? error.message : 'Error al subir la imagen');
            }
        }

        // 4. Crear calendario si existe
        if (data.calendar && projectId) {
            try {
                await createProjectCalendar(projectId, data.calendar);
            } catch (error) {
                console.error('Error al crear el calendario:', error);
                throw new Error(error instanceof Error ? error.message : 'Error al crear el calendario');
            }
        }

        return projectId;
    } catch (error) {
        // Rollback en caso de error
        await handleRollback({
            clientId,
            projectId,
            hasCalendar: !!data.calendar,
            hasImage: !!imageUrl
        });
        throw error; // Re-lanzar el error original
    }
};

interface RollbackData {
    clientId: number | null;
    projectId: number | null;
    hasCalendar: boolean;
    hasImage: boolean;
}

const handleRollback = async (data: RollbackData) => {
    try {
        if (data.projectId) {
            if (data.hasCalendar) {
                await deleteProjectCalendar(data.projectId);
            }
            if (data.hasImage) {
                await deleteProjectImage(data.projectId);
            }
            await deleteProject(data.projectId);
        }
        if (data.clientId) {
            await deleteClient(data.clientId);
        }
    } catch (rollbackError) {
        console.error('Error durante el rollback:', rollbackError);
    }
}; 
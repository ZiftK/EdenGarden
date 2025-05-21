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
    project: ProjectToCreate;
    calendar?: ProjectCalendarToCreate;
    image?: string;
}

export const createNewProject = async (data: CreateProjectData) => {
    let clientId: number | null = null;
    let projectId: number | null = null;
    let imageUrl: string | null = null;

    try {
        // 1. Subir imagen si existe
        if (data.image) {
            imageUrl = await uploadProjectImage(data.image);
        }

        // 2. Crear cliente
        clientId = await createClient(data.client);
        if (!clientId) {
            throw new Error('Error al crear el cliente');
        }

        // 3. Crear proyecto
        const projectData = {
            ...data.project,
            cliente: clientId,
            img: imageUrl
        };
        projectId = await createProject(projectData);
        if (!projectId) {
            throw new Error('Error al crear el proyecto');
        }

        // 4. Crear calendario si existe
        if (data.calendar) {
            await createProjectCalendar(projectId, data.calendar);
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
        throw error;
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
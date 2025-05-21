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
    cliente: ClientToCreate;
    proyecto: {
        nombre: string;
        descripcion?: string;
        estado: string;
        costo: number;
        equipo: number;
    };
    calendario?: ProjectCalendarToCreate;
    img?: string;
}

export const createNewProject = async (data: CreateProjectData) => {
    let clientId: number | null = null;
    let projectId: number | null = null;
    let imageUrl: string | null = null;
    let calendarCreated = false;

    try {
        // 1. Crear cliente
        try {
            clientId = await createClient(data.cliente);
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            throw new Error(error instanceof Error ? error.message : 'Error al crear el cliente');
        }

        // 2. Crear proyecto
        const projectData: ProjectToCreate = {
            nombre: data.proyecto.nombre,
            descripcion: data.proyecto.descripcion || '',
            estado: data.proyecto.estado || 'PENDIENTE',
            costo: data.proyecto.costo,
            cliente: clientId,
            equipo: data.proyecto.equipo,
            img: ''
        };

        try {
            projectId = await createProject(projectData);
            console.log('Datos enviados al crear proyecto:', projectData);
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            throw error;
        }

        // 3. Crear calendario si existe
        if (data.calendario && projectId) {
            try {
                await createProjectCalendar(projectId, data.calendario);
                calendarCreated = true;
            } catch (error) {
                console.error('Error al crear el calendario:', error);
                throw new Error(error instanceof Error ? error.message : 'Error al crear el calendario');
            }
        }

        // 4. Subir imagen si existe
        if (data.img && projectId) {
            try {
                imageUrl = await uploadProjectImage(projectId, data.img);
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                throw new Error(error instanceof Error ? error.message : 'Error al subir la imagen');
            }
        }

        return projectId;
    } catch (error) {
        // Rollback en caso de error
        await handleRollback({
            clientId,
            projectId,
            hasCalendar: calendarCreated,
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
                try {
                    await deleteProjectCalendar(data.projectId);
                } catch (error) {
                    console.error('Error al eliminar el calendario durante rollback:', error);
                    // Continue with rollback even if calendar deletion fails
                }
            }
            if (data.hasImage) {
                try {
                    await deleteProjectImage(data.projectId);
                } catch (error) {
                    console.error('Error al eliminar la imagen durante rollback:', error);
                    // Continue with rollback even if image deletion fails
                }
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
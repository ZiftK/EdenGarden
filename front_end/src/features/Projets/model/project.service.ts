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

export interface CreateProjectData {
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

export const createNewProjectWithImage = async (data: CreateProjectData): Promise<number> => {
    // Create the project first
    const projectId = await createNewProject(data)

    // If we have an image and project was created successfully, upload the image
    if (projectId && data.img) {
        try {
            await uploadProjectImage(projectId, data.img)
        } catch (error) {
            console.error('Error al subir la imagen:', error)
            // Don't throw here, allow the project creation to succeed
        }
    }

    return projectId
}

export const createNewProject = async (data: CreateProjectData) => {
    let clientId: number | null = null;
    let projectId: number | null = null;
    let calendarCreated = false;

    try {
        // 1. Crear cliente
        try {
            clientId = await createClient(data.cliente);
            if (!clientId) {
                throw new Error('No se recibió el ID del cliente al crearlo');
            }
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
            if (!projectId) {
                throw new Error('No se recibió el ID del proyecto al crearlo');
            }
            console.log('Proyecto creado con ID:', projectId);
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            // Si falla la creación del proyecto, eliminamos el cliente
            if (clientId) {
                try {
                    await deleteClient(clientId);
                } catch (deleteError) {
                    console.error('Error al eliminar el cliente durante rollback:', deleteError);
                }
            }
            throw error;
        }

        // 3. Crear calendario si existe
        if (data.calendario?.fecha_inicio && data.calendario?.fecha_fin && projectId) {
            try {
                const calendarData = {
                    fecha_inicio: data.calendario.fecha_inicio,
                    fecha_fin: data.calendario.fecha_fin
                };
                await createProjectCalendar(projectId, calendarData);
                calendarCreated = true;
            } catch (error) {
                console.error('Error al crear el calendario:', error);
                // Si falla la creación del calendario, hacemos rollback del proyecto y cliente
                await handleRollback({
                    clientId,
                    projectId,
                    hasCalendar: false,
                    hasImage: false
                });
                throw new Error(error instanceof Error ? error.message : 'Error al crear el calendario');
            }
        }

        return projectId;
    } catch (error) {
        // Rollback en caso de error
        if (clientId || projectId) {
            await handleRollback({
                clientId,
                projectId,
                hasCalendar: calendarCreated,
                hasImage: false
            });
        }
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
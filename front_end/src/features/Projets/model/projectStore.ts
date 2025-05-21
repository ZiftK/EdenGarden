import { create } from 'zustand'
import { fetcher } from '@/src/shared/api/httpClient'
import { Project, ProjectFromAPI } from '../types'
import { endpoints } from '@/src/shared/api/endpoints'
import { Team } from '../../Teams/types/teamFromAPI'
import { ShortTeam } from '@/src/shared/types'
import { ClientToCreate } from '../types/client'

const mapTeamToShortTeam = (team: Team): ShortTeam => ({
    id_equipo: team.id_equipo,
    nombre: team.lider.nombre, // Usando el nombre del líder como nombre del equipo
    lider: {
        email: team.lider.email,
        id_empleado: team.lider.id_empleado,
        nombre: team.lider.nombre,
        telefono: team.lider.telefono,
        rol: team.lider.rol,
        puesto: team.lider.puesto,
        salario: team.lider.salario,
        equipo: team.lider.equipo,
        img: team.lider.img,
    },
    empleados: team.empleados.map(emp => ({
        email: emp.email,
        id_empleado: emp.id_empleado,
        nombre: emp.nombre,
        telefono: emp.telefono,
        rol: emp.rol,
        puesto: emp.puesto,
        salario: emp.salario,
        equipo: emp.equipo,
        img: emp.img,
    })),
})

const mapProjectFromAPIToProject = (projectFromAPI: ProjectFromAPI): Project => ({
    ...projectFromAPI,
    equipo: projectFromAPI.equipo ? mapTeamToShortTeam(projectFromAPI.equipo) : undefined,
    cliente: {
        nombre: projectFromAPI.cliente.nombre,
        direccion: projectFromAPI.cliente.direccion,
        telefono: projectFromAPI.cliente.telefono,
        email: projectFromAPI.cliente.email,
    },
})

interface ProjectState {
    projects: Project[];
    currentProject: Project | null;
    isLoading: boolean;
    error: string | null;

    // Acciones para la lista de proyectos
    getProjects: () => Promise<void>;
    
    // Acciones para un proyecto específico
    getProjectById: (id: string) => Promise<void>;
    deleteProject: (id: string) => Promise<void>;
    updateProject: (id: string, data: Project) => Promise<void>;
    createProject: (data: Project) => Promise<void>;
    
    // Acciones para el estado
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCurrentProject: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null,

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearCurrentProject: () => set({ currentProject: null }),

    getProjects: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: ProjectFromAPI[]}>(`${endpoints.projects}`)
            if (!response || !response.data) {
                throw new Error('No se encontraron proyectos')
            }
            const projects = response.data.map(mapProjectFromAPIToProject)
            set({ projects })
        } catch (error) {
            console.error('Error al obtener los proyectos:', error)
            set({ error: 'Error al obtener los proyectos' })
        } finally {
            set({ isLoading: false })
        }
    },

    getProjectById: async (id) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: ProjectFromAPI}>(`${endpoints.project}/${id}`)
            if (!response || !response.data) {
                throw new Error('No se encontró el proyecto')
            }
            const project = mapProjectFromAPIToProject(response.data)
            set({ currentProject: project })
        } catch (error) {
            console.error('Error al obtener el proyecto:', error)
            set({ error: 'Error al obtener el proyecto' })
        } finally {
            set({ isLoading: false })
        }
    },

    deleteProject: async (id) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.delete(`${endpoints.project}/${id}`)
            // Actualizar la lista de proyectos después de eliminar
            const updatedProjects = get().projects.filter(proj => proj.id_proyecto !== Number(id))
            set({ projects: updatedProjects })
        } catch (error) {
            console.error('Error al eliminar el proyecto:', error)
            set({ error: 'Error al eliminar el proyecto' })
        } finally {
            set({ isLoading: false })
        }
    },

    updateProject: async (id, data) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.put(`${endpoints.project}/${id}`, data)
            // Actualizar el proyecto actual y la lista de proyectos
            set({ currentProject: data })
            const updatedProjects = get().projects.map(proj => 
                proj.id_proyecto === Number(id) ? data : proj
            )
            set({ projects: updatedProjects })
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error)
            set({ error: 'Error al actualizar el proyecto' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    createProject: async (data) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.post(endpoints.project, data)
            // Actualizar la lista de proyectos después de crear uno nuevo
            await get().getProjects()
        } catch (error) {
            console.error('Error al crear el proyecto:', error)
            set({ error: 'Error al crear el proyecto' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    }
})) 
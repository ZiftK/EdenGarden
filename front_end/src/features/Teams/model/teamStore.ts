import { create } from 'zustand'
import { fetcher } from '@/src/shared/api/httpClient'
import { ShortTeam } from '@/src/shared/types'
import { endpoints } from '@/src/shared/api/endpoints'
import { Team } from '../types/teamFromAPI'

interface TeamState {
    teams: ShortTeam[];
    currentTeam: ShortTeam | null;
    isLoading: boolean;
    error: string | null;

    // Acciones para la lista de equipos
    getTeams: () => Promise<void>;
    
    // Acciones para un equipo específico
    getTeamById: (id: string) => Promise<void>;
    deleteTeam: (id: string) => Promise<void>;
    updateTeam: (id: string, data: ShortTeam) => Promise<void>;
    createTeam: (data: ShortTeam) => Promise<void>;
    
    // Acciones para el estado
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCurrentTeam: () => void;
}

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

export const useTeamStore = create<TeamState>((set, get) => ({
    teams: [],
    currentTeam: null,
    isLoading: false,
    error: null,

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearCurrentTeam: () => set({ currentTeam: null }),

    getTeams: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: Team[]}>(`${endpoints.teams}`)
            if (!response || !response.data) {
                throw new Error('No se encontraron equipos')
            }
            const shortTeams = response.data.map(mapTeamToShortTeam)
            set({ teams: shortTeams })
        } catch (error) {
            console.error('Error al obtener los equipos:', error)
            set({ error: 'Error al obtener los equipos' })
        } finally {
            set({ isLoading: false })
        }
    },

    getTeamById: async (id) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: Team}>(`${endpoints.team}/${id}`)
            if (!response || !response.data) {
                throw new Error('No se encontró el equipo')
            }
            const shortTeam = mapTeamToShortTeam(response.data)
            set({ currentTeam: shortTeam })
        } catch (error) {
            console.error('Error al obtener el equipo:', error)
            set({ error: 'Error al obtener el equipo' })
        } finally {
            set({ isLoading: false })
        }
    },

    deleteTeam: async (id) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.delete(`${endpoints.team}/${id}`)
            // Actualizar la lista de equipos después de eliminar
            const updatedTeams = get().teams.filter(team => team.id_equipo !== Number(id))
            set({ teams: updatedTeams })
        } catch (error) {
            console.error('Error al eliminar el equipo:', error)
            set({ error: 'Error al eliminar el equipo' })
        } finally {
            set({ isLoading: false })
        }
    },

    updateTeam: async (id, data) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.put(`${endpoints.team}/${id}`, data)
            // Actualizar el equipo actual y la lista de equipos
            set({ currentTeam: data })
            const updatedTeams = get().teams.map(team => 
                team.id_equipo === Number(id) ? data : team
            )
            set({ teams: updatedTeams })
        } catch (error) {
            console.error('Error al actualizar el equipo:', error)
            set({ error: 'Error al actualizar el equipo' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    createTeam: async (data) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.post(endpoints.team, data)
            // Actualizar la lista de equipos después de crear uno nuevo
            await get().getTeams()
        } catch (error) {
            console.error('Error al crear el equipo:', error)
            set({ error: 'Error al crear el equipo' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    }
})) 
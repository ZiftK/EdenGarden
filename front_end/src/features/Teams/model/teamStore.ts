import { create } from 'zustand'
import { Team, TeamCreate } from '@/src/shared/types'

interface TeamState {
    teams: Team[]
    isLoading: boolean
    error: string | null
    getTeams: () => Promise<void>
    createTeam: (team: TeamCreate) => Promise<void>
    updateTeam: (id: number, team: Partial<Team>) => Promise<void>
}

export const useTeamStore = create<TeamState>((set) => ({
    teams: [],
    isLoading: false,
    error: null,

    getTeams: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch('http://127.0.0.1:8000/team/all')
            if (!response.ok) {
                throw new Error('Error al obtener los equipos')
            }
            const data = await response.json()
            set({ teams: data, isLoading: false })
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false })
        }
    },

    createTeam: async (team) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch('http://127.0.0.1:8000/team/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team),
            })
            if (!response.ok) {
                throw new Error('Error al crear el equipo')
            }
            // Refresh teams list after creation
            const getTeamsResponse = await fetch('http://127.0.0.1:8000/team/all')
            const data = await getTeamsResponse.json()
            set({ teams: data, isLoading: false })
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false })
        }
    },

    updateTeam: async (id, team) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(`http://127.0.0.1:8000/team/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(team),
            })
            if (!response.ok) {
                throw new Error('Error al actualizar el equipo')
            }
            // Refresh teams list after update
            const getTeamsResponse = await fetch('http://127.0.0.1:8000/team/all')
            const data = await getTeamsResponse.json()
            set({ teams: data, isLoading: false })
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false })
        }
    },
})) 
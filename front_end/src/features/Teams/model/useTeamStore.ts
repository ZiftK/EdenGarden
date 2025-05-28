import {create} from 'zustand'
import { fetcher } from '@/src/shared/api/httpClient'
import { ShortTeam } from '@/src/shared/types' 
import { TeamsState } from '../types/types'

export const useTeamStore = create<TeamsState>((set) => ({
    teams: [],
    loading: false,
    error: null,
    setTeams: (teams: ShortTeam[]) => set({ teams }),
    fetchTeams: async () => {
        set({loading: true, error: null})
        try{
            const teams = await fetcher.get<ShortTeam[]>(`/teams`)
            set({teams, loading: false})
        }catch (error: unknown) {
            set({error: 'Error fetching teams', loading: false})
            console.error(error)
        }},
    addTeam: async (team: ShortTeam) => {
        set({loading: true, error :null})
        try{
            const newTeam = await fetcher.post<ShortTeam>(`/teams`, team)
            set((state) => ({
                teams: [...state.teams, newTeam],
                loading: false,
            }))
        } catch{
            set({error: 'Error adding team', loading: false})
        }
    },
    removeTeam: async (teamId: string) => {
        set({loading: true, error: null})
        try{
            await fetcher.delete(`/teams/${teamId}`)
            set((state) => ({
                teams: state.teams.filter((team) => team.id_equipo.toString() !== teamId),
                loading: false,
            }))
        } catch{
            set({error: 'Error removing team', loading: false})
        }
    }
}))
import { create } from 'zustand'
import { AttendanceRecord, Employee } from '../types'
import { API_ENDPOINTS } from '@/src/shared/config/api'

interface AttendanceState {
    attendance: AttendanceRecord[]
    teamMembers: Employee[]
    isLoading: boolean
    error: string | null
    
    // Acciones para la asistencia
    getTeamAttendance: (teamId: number) => Promise<void>
    getEmployeeAttendance: (employeeId: number) => Promise<void>
    getTeamMembers: (teamId: number) => Promise<void>
    markAttendance: (employeeId: number) => Promise<void>
    markExit: (attendanceId: number) => Promise<void>
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
    attendance: [],
    teamMembers: [],
    isLoading: false,
    error: null,

    getTeamAttendance: async (teamId: number) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(API_ENDPOINTS.attendance.getTeamAttendance(teamId))
            if (!response.ok) throw new Error('Failed to fetch team attendance')
            const data = await response.json()
            set({ attendance: data })
        } catch (error) {
            set({ error: 'Error fetching team attendance' })
            console.error('Error fetching team attendance:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    getEmployeeAttendance: async (employeeId: number) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(API_ENDPOINTS.attendance.getEmployeeAttendance(employeeId))
            if (!response.ok) throw new Error('Failed to fetch employee attendance')
            const data = await response.json()
            set({ attendance: data })
        } catch (error) {
            set({ error: 'Error fetching employee attendance' })
            console.error('Error fetching employee attendance:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    getTeamMembers: async (teamId: number) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(API_ENDPOINTS.teams.getMembers(teamId))
            if (!response.ok) throw new Error('Failed to fetch team members')
            const data = await response.json()
            set({ teamMembers: data })
        } catch (error) {
            set({ error: 'Error fetching team members' })
            console.error('Error fetching team members:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    markAttendance: async (employeeId: number) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(API_ENDPOINTS.attendance.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fk_empleado: employeeId,
                    fecha: new Date().toISOString().split('T')[0],
                    hora_entrada: new Date().toTimeString().split(' ')[0],
                }),
            })

            if (!response.ok) throw new Error('Failed to mark attendance')
            
            const data = await response.json()
            set(state => ({
                attendance: [...state.attendance, data]
            }))
        } catch (error) {
            set({ error: 'Error marking attendance' })
            console.error('Error marking attendance:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    markExit: async (attendanceId: number) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(API_ENDPOINTS.attendance.markExit(attendanceId), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hora_salida: new Date().toTimeString().split(' ')[0],
                }),
            })

            if (!response.ok) throw new Error('Failed to mark exit')
            
            const data = await response.json()
            set(state => ({
                attendance: state.attendance.map(record =>
                    record.id_asistencia === attendanceId ? data : record
                )
            }))
        } catch (error) {
            set({ error: 'Error marking exit' })
            console.error('Error marking exit:', error)
        } finally {
            set({ isLoading: false })
        }
    },
})) 
import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Employee } from "@/src/shared/types"
import { create } from "zustand"

interface EmployeeState {
    employees: Employee[];
    currentEmployee: Employee | null;
    isLoading: boolean;
    error: string | null;

    // Acciones para la lista de empleados
    getEmployees: () => Promise<void>;
    getLeaders: () => Promise<Employee[]>;
    
    // Acciones para un empleado específico
    getEmployeeById: (id: string) => Promise<void>;
    deleteEmployee: (id: string) => Promise<void>;
    updateEmployee: (id: string, data: Employee) => Promise<void>;
    createEmployee: (data: Employee) => Promise<void>;
    
    // Acciones para el estado
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCurrentEmployee: () => void;

    getAllEmployees: () => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: [],
    currentEmployee: null,
    isLoading: false,
    error: null,

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearCurrentEmployee: () => set({ currentEmployee: null }),

    getEmployees: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: Employee[]}>(`${endpoints.employees}`)
            if (!response || !response.data) {
                throw new Error('No se encontraron empleados')
            }
            set({ employees: response.data })
        } catch (error) {
            console.error('Error al obtener los empleados:', error)
            set({ error: 'Error al obtener los empleados' })
        } finally {
            set({ isLoading: false })
        }
    },

    getLeaders: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: Employee[]}>(`${endpoints.employees}`)
            if (!response || !response.data) {
                throw new Error('No se encontraron líderes')
            }
            const leaders = response.data.filter(emp => emp.rol === 'leader')
            return leaders
        } catch (error) {
            console.error('Error al obtener los líderes:', error)
            set({ error: 'Error al obtener los líderes' })
            return []
        } finally {
            set({ isLoading: false })
        }
    },

    getEmployeeById: async (id) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetcher.get<{message: string, data: Employee}>(`${endpoints.employeeById}/${id}`)
            if (!response || !response.data) {
                throw new Error('No se encontró el empleado')
            }
            set({ currentEmployee: response.data })
        } catch (error) {
            console.error('Error al obtener el empleado:', error)
            set({ error: 'Error al obtener el empleado' })
        } finally {
            set({ isLoading: false })
        }
    },

    deleteEmployee: async (id) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.delete(`${endpoints.employeeDelete}/${id}`)
            // Actualizar la lista de empleados después de eliminar
            const updatedEmployees = get().employees.filter(emp => emp.id_empleado !== id)
            set({ employees: updatedEmployees })
        } catch (error) {
            console.error('Error al eliminar el empleado:', error)
            set({ error: 'Error al eliminar el empleado' })
        } finally {
            set({ isLoading: false })
        }
    },

    updateEmployee: async (id, data) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.put(`${endpoints.employeeUpdate}/${id}`, data)
            // Actualizar el empleado actual y la lista de empleados
            set({ currentEmployee: data })
            const updatedEmployees = get().employees.map(emp => 
                emp.id_empleado === id ? data : emp
            )
            set({ employees: updatedEmployees })
        } catch (error) {
            console.error('Error al actualizar el empleado:', error)
            set({ error: 'Error al actualizar el empleado' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    createEmployee: async (data) => {
        try {
            set({ isLoading: true, error: null })
            await fetcher.post(endpoints.employeeCreate, data)
            // Actualizar la lista de empleados después de crear uno nuevo
            await get().getEmployees()
        } catch (error) {
            console.error('Error al crear el empleado:', error)
            set({ error: 'Error al crear el empleado' })
            throw error
        } finally {
            set({ isLoading: false })
        }
    },

    getAllEmployees: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch('http://127.0.0.1:8000/employee/all')
            if (!response.ok) {
                throw new Error('Error al obtener los empleados')
            }
            const data = await response.json()
            set({ employees: data, isLoading: false })
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false })
        }
    }
}))
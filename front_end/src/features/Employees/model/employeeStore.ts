import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Employee } from "@/src/shared/types"
import { create } from "zustand"

interface EmployeeState {
    employees: Employee[];
    isLoading: boolean;
    error: string | null;

    getEmployees: () => Promise<void>;
    getLeaders: () => Promise<Employee[]>;
    getEmployeeById: (id: string) => Promise<Employee | null>;
    
    deleteEmployee: (id: string) => Promise<void>;
    updateEmployee: (id: string, data: Employee) => Promise<void>;
    createEmployee: (data: Employee) => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    isLoading: false,
    error: null,

    getEmployees: async() => {
        set({ isLoading: true, error: null})
        try{
            const dataEmployees: Employee[] = await fetcher.get<Employee[]>(`${endpoints.employees}`)
            if(!dataEmployees)  throw new Error('No se encontraron empleados')
            return dataEmployees['data']
        } catch (error) {
            console.error('Error al obtener los empleados:', error)
            throw new Error('Error al obtener los empleados')
        }
    },

    getLeaders: async() => {
        set({ isLoading: true, error: null})
        try {
            const dataLeaders: Employee[] = await fetcher.get<Employee[]>(`${endpoints.employees}`)
            if (!dataLeaders) throw new Error('No se encontraron empleados')
            const leaders = dataLeaders.filter((employee) => employee.rol === 'leader')
            return leaders
        } catch (error) {
            console.error('Error al obtener los empleados:', error)
            throw new Error('Error al obtener los empleados')
        }
    },

    deleteEmployee: async(id: string) => {
        set({ isLoading: true, error: null})
        try {
            await fetcher.delete(`${endpoints.employeeDelete}/${id}`)   
        } catch (error) {
            console.error('Error al eliminar el empleado:', error)
            throw new Error('Error al eliminar el empleado')
        }
    },

    createEmployee: async (data: Employee) => {
        set({ isLoading: true, error: null})
        try {
            await fetcher.post(`${endpoints.employeeCreate}`, data)
        } catch (error) {
            console.error('Error al crear el empleado:', error)
            throw new Error('Error al crear el empleado')
        }
        
    },

    getEmployeeById: async (id: string) => {
        set({ isLoading: true, error: null})
        try {
            const dataEmployee: Employee = await fetcher.get<Employee>(`${endpoints.employeeById}/${id}`)
            if(!dataEmployee)  throw new Error('No se encontraron empleados')
            return dataEmployee
        } catch (error) {
            console.error('Error al obtener el empleado:', error)
            throw new Error('Error al obtener el empleado')
        }
    },
    updateEmployee: async (id: string, data: Employee) => {
        set({ isLoading: true, error: null})
        try {
            await fetcher.put(`${endpoints.employeeUpdate}/${id}`, data)
        } catch (error) {
            console.error('Error al actualizar el empleado:', error)
            throw new Error('Error al actualizar el empleado')
        }
    }
}))
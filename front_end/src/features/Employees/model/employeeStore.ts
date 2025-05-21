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
    deleteEmployee: (id: number) => Promise<void>;
    updateEmployee: (id: number, data: Employee) => Promise<void>;
    createEmployee: (data: Employee) => Promise<void>;
    
    // Acciones para el estado
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearCurrentEmployee: () => void;
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
            set({ isLoading: true, error: null });
            console.log('Fetching employees from API...');
            
            const response = await fetch('http://127.0.0.1:8000/employee/all');
            console.log('API Response status:', response.status);
            
            if (!response.ok) {
                throw new Error(`Error al obtener los empleados: ${response.status} ${response.statusText}`);
            }
            
            const responseData = await response.json();
            console.log('Raw API response:', responseData);
            
            // The API returns { message: string, data: Employee[] }
            const employeesArray = Array.isArray(responseData.data) ? responseData.data : [];
            console.log('Processed employees array:', employeesArray);
            
            set({ employees: employeesArray, isLoading: false });
        } catch (error) {
            console.error('Error en getEmployees:', error);
            set({ employees: [], error: (error as Error).message, isLoading: false });
        }
    },

    getLeaders: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await fetch('http://127.0.0.1:8000/employee/all');
            if (!response.ok) {
                throw new Error('No se encontraron líderes');
            }
            const responseData = await response.json();
            const allEmployees = Array.isArray(responseData.data) ? responseData.data : [];
            const leaders = allEmployees.filter((emp: Employee) => emp.rol === 'leader');
            return leaders;
        } catch (error) {
            console.error('Error al obtener los líderes:', error);
            set({ error: 'Error al obtener los líderes' });
            return [];
        } finally {
            set({ isLoading: false });
        }
    },

    getEmployeeById: async (id) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(`http://127.0.0.1:8000/employee/id/${id}`)
            if (!response.ok) {
                throw new Error('No se encontró el empleado')
            }
            const data = await response.json()
            set({ currentEmployee: data, isLoading: false })
        } catch (error) {
            console.error('Error al obtener el empleado:', error)
            set({ error: 'Error al obtener el empleado', isLoading: false })
        }
    },

    deleteEmployee: async (id) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(`http://127.0.0.1:8000/employee/delete/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Error al eliminar el empleado')
            }
            const updatedEmployees = get().employees.filter(emp => emp.id_empleado !== id)
            set({ employees: updatedEmployees, isLoading: false })
        } catch (error) {
            console.error('Error al eliminar el empleado:', error)
            set({ error: 'Error al eliminar el empleado', isLoading: false })
        }
    },

    updateEmployee: async (id, data) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch(`http://127.0.0.1:8000/employee/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error('Error al actualizar el empleado')
            }
            set({ currentEmployee: data })
            const updatedEmployees = get().employees.map(emp => 
                emp.id_empleado === id ? data : emp
            )
            set({ employees: updatedEmployees, isLoading: false })
        } catch (error) {
            console.error('Error al actualizar el empleado:', error)
            set({ error: 'Error al actualizar el empleado', isLoading: false })
            throw error
        }
    },

    createEmployee: async (data) => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch('http://127.0.0.1:8000/employee/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error('Error al crear el empleado')
            }
            await get().getEmployees()
        } catch (error) {
            console.error('Error al crear el empleado:', error)
            set({ error: 'Error al crear el empleado', isLoading: false })
            throw error
        }
    }
}))
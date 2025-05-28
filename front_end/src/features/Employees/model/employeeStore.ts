import { create } from "zustand"
import { Employee } from "@/src/shared/types"

interface EmployeeState {
    employees: Employee[];
    currentEmployee: Employee | null;
    isLoading: boolean;
    error: string | null;
    isInitialLoading: boolean;

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
    isLoading: true,
    isInitialLoading: true,
    error: null,

    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearCurrentEmployee: () => set({ currentEmployee: null, error: null, isLoading: true, isInitialLoading: true }),

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
            
            set({ employees: employeesArray, isLoading: false, error: null });
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
            const leaders = allEmployees.filter((emp: Employee) => 
                emp.rol === 'lider' && !emp.fk_equipo
            );
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
        if (!id) return;

        try {
            // Asegurar que isLoading está true desde el inicio
            set(state => ({
                ...state,
                isLoading: true,
                isInitialLoading: true,
                error: null,
                currentEmployee: null
            }));

            const response = await fetch(`http://127.0.0.1:8000/employee/id/${id}`);
            const responseData = await response.json();
            
            if (!response.ok || !responseData.data) {
                throw new Error('No se encontró el empleado');
            }
            
            const employeeData = responseData.data;
            
            if (!employeeData || !employeeData.id_empleado) {
                throw new Error('Datos del empleado incompletos');
            }

            const formattedEmployee = {
                ...employeeData,
                fecha_contratacion: employeeData.fecha_contratacion ? {
                    dia: employeeData.fecha_contratacion.dia,
                    mes: employeeData.fecha_contratacion.mes,
                    anno: employeeData.fecha_contratacion.anno
                } : null,
                fecha_salida: employeeData.fecha_salida ? {
                    dia: employeeData.fecha_salida.dia,
                    mes: employeeData.fecha_salida.mes,
                    anno: employeeData.fecha_salida.anno
                } : null,
                fecha_recontratacion: employeeData.fecha_recontratacion ? {
                    dia: employeeData.fecha_recontratacion.dia,
                    mes: employeeData.fecha_recontratacion.mes,
                    anno: employeeData.fecha_recontratacion.anno
                } : null
            };
            
            set({ 
                currentEmployee: formattedEmployee, 
                isLoading: false, 
                isInitialLoading: false,
                error: null 
            });
        } catch (error) {
            set({ 
                currentEmployee: null, 
                error: (error as Error).message,
                isLoading: false,
                isInitialLoading: false
            });
        }
    },

    deleteEmployee: async (id) => {
        try {
            set({ isLoading: true, error: null });
            const response = await fetch(`http://127.0.0.1:8000/employee/delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el empleado');
            }
            const updatedEmployees = get().employees.filter(emp => emp.id_empleado !== id);
            set({ employees: updatedEmployees, isLoading: false, error: null });
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
            set({ error: 'Error al eliminar el empleado', isLoading: false });
            throw error;
        }
    },

    updateEmployee: async (id, data) => {
        try {
            set({ isLoading: true, error: null });
            const response = await fetch(`http://127.0.0.1:8000/employee/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el empleado');
            }
            set({ currentEmployee: data, error: null });
            const updatedEmployees = get().employees.map(emp => 
                emp.id_empleado === id ? data : emp
            );
            set({ employees: updatedEmployees, isLoading: false });
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            set({ error: 'Error al actualizar el empleado', isLoading: false });
            throw error;
        }
    },

    createEmployee: async (data) => {
        try {
            set({ isLoading: true, error: null });
            const response = await fetch('http://127.0.0.1:8000/employee/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Error al crear el empleado');
            }
            await get().getEmployees();
            set({ isLoading: false, error: null });
        } catch (error) {
            console.error('Error al crear el empleado:', error);
            set({ error: 'Error al crear el empleado', isLoading: false });
            throw error;
        }
    }
}))
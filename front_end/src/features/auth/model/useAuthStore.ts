import {create} from 'zustand';
import { AuthState, Employee } from '@/src/shared/types'
import { loginUser } from '../login/model'

// Función para limpiar datos sensibles del usuario
const sanitizeUser = (user: Employee & { clave?: string }): Employee => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clave, ...safeUser } = user;
    return safeUser;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,
    setUser: (user: Employee) => set({ user: sanitizeUser(user) }),
    validateSession: async () => {
        set({ loading: true, error: null });
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // Asegurarnos de que no hay datos sensibles
                set({ user: sanitizeUser(parsedUser), loading: false });
                return;
            }
            set({ user: null, loading: false });
        } catch (error) {
            localStorage.removeItem('user');
            set({ 
                error: error instanceof Error ? error.message : 'Error al validar la sesión',
                loading: false,
                user: null
            });
        }
    },
    login: async (expediente, clave) => {
        set({ loading: true, error: null });
        try {
            const userData = await loginUser({ expediente, clave });
            // Limpiar datos sensibles antes de almacenar
            const safeUser = sanitizeUser(userData);
            localStorage.setItem('user', JSON.stringify(safeUser));
            set({ user: safeUser, loading: false });
        } catch (error) {
            localStorage.removeItem('user');
            set({ 
                error: error instanceof Error ? error.message : 'Error al iniciar sesión', 
                loading: false,
                user: null
            });
        }
    },
    logout: async () => {
        set({ loading: true, error: null });
        try {
            localStorage.removeItem('user');
            set({ user: null, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error al cerrar sesión',
                loading: false 
            });
        }
    },
}))
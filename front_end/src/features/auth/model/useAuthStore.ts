import {create} from 'zustand';
import { fetcher } from '@/src/shared/api/httpClient';
import { AuthState, Employee } from '@/src/shared/types'
import { loginUser } from '../login/model'

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,
    setUser: (user: Employee) => set({ user }),
    validateSession: async () => {
        set({ loading: true, error: null });
        try {
            // Si ya tenemos un usuario en el store, no necesitamos validar
            const currentState = useAuthStore.getState();
            if (currentState.user) {
                set({ loading: false });
                return;
            }
            
            // Si no hay usuario, intentamos obtener la sesión del localStorage
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                set({ user: JSON.parse(storedUser), loading: false });
                return;
            }

            // Si no hay sesión almacenada, el usuario no está autenticado
            set({ user: null, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error al validar la sesión',
                loading: false,
                user: null
            });
            localStorage.removeItem('user');
        }
    },
    login: async (expediente, clave) => {
        set({ loading: true, error: null });
        try {
            const user = await loginUser({ expediente, clave });
            localStorage.setItem('user', JSON.stringify(user));
            set({ user, loading: false });
        } catch (error) {
            set({ 
                error: error instanceof Error ? error.message : 'Error al iniciar sesión', 
                loading: false,
                user: null
            });
            localStorage.removeItem('user');
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
import {create} from 'zustand';
import { fetcher } from '@/src/shared/api/httpClient';
import { AuthState, User } from '@/src/shared/types'
import { loginUser } from '../login/model'


export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    error: null,
    setUser: (user: User) => set({ user }),
    validateSession: async () => {
        set({ loading: true, error: null });
        try {
            const user = await fetcher.get<User>('/auth/session');
            set({ user, loading: false });
        } catch {
            set({ error: 'Error validating session', loading: false });
        }
    },
    login: async (expedient, password) => {
        set({ loading: true });
        try {
            const user = await loginUser({ exp: expedient, password });
            set({ user, loading: false });
        } catch {
            set({ error: 'Error logging in', loading: false });
        }
    },
    logout: async () => {
        set({ loading: true });
        try {
            await fetcher.post('/auth/logout');
            set({ user: null, loading: false });
        } catch {
            set({ error: 'Error logging out', loading: false });
        }
    },
}))
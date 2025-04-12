export type User = {
    expedient: string;
    password: string;
    role: 'user' | 'admin' | 'leader';
}

export type AuthState = {
    user: User | null
    loading: boolean
    error: string | null
    validateSession: () => Promise<void>
    login: (expedient: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

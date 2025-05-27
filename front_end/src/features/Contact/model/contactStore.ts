import { create } from 'zustand'
import { fetcher } from '@/src/shared/api/httpClient'

type ApiErrorDetail = {
    type: string;
    loc: string[];
    msg: string;
    input: unknown;
};

type ApiError = {
    response?: {
        data?: {
            detail?: ApiErrorDetail[];
        };
    };
    message?: string;
    status?: number;
    statusText?: string;
};

export interface ContactMessage {
    id: string
    name: string
    email: string
    phone: string
    message: string
    created_at: string
    status: 'nuevo' | 'prospecto' | 'cliente' | 'eliminado'
    read: boolean
}

interface ContactState {
    messages: ContactMessage[]
    loading: boolean
    error: string | null
    getMessages: () => Promise<void>
    createMessage: (message: Omit<ContactMessage, 'id' | 'created_at' | 'status' | 'read'>) => Promise<void>
    markAsRead: (id: string) => Promise<void>
    updateStatus: (id: string, status: 'nuevo' | 'prospecto' | 'cliente' | 'eliminado') => Promise<void>
}

export const useContactStore = create<ContactState>((set) => ({
    messages: [],
    loading: false,
    error: null,

    getMessages: async () => {
        try {
            set({ loading: true, error: null })
            const response = await fetcher.get<ContactMessage[]>('/contact/messages')
            set({ messages: response, loading: false })
        } catch (error) {
            console.error('Error fetching messages:', error)
            set({ error: 'Error al obtener los mensajes', loading: false })
        }
    },

    createMessage: async (message) => {
        try {
            set({ loading: true, error: null })
            await fetcher.post('/contact/messages', message)
            set({ loading: false })
        } catch (error) {
            console.error('Error creating message:', error)
            set({ error: 'Error al enviar el mensaje', loading: false })
            throw error
        }
    },

    markAsRead: async (id) => {
        try {
            set({ loading: true, error: null })
            await fetcher.patch(`/contact/messages/${id}/read`, {})
            const response = await fetcher.get<ContactMessage[]>('/contact/messages')
            set({ messages: response, loading: false })
        } catch (error) {
            console.error('Error marking message as read:', error)
            set({ error: 'Error al marcar como leído', loading: false })
        }
    },

    updateStatus: async (id, status) => {
        try {
            set({ error: null })
            // Send status as a query parameter
            const response = await fetcher.patch(`/contact/messages/${id}/status?status=${status}`, {})

            if (!response) {
                throw new Error('No response received from server')
            }

            // Only fetch messages if the status update was successful
            const updatedMessages = await fetcher.get<ContactMessage[]>('/contact/messages')
            set({ messages: updatedMessages })
        } catch (error) {
            const apiError = error as ApiError
            console.error('Error updating status:', apiError)
            set({ 
                error: apiError?.response?.data?.detail?.[0]?.msg || 'Error al actualizar el estado'
            })
            throw error
        }
    }
})) 
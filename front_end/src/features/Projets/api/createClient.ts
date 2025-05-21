import { fetcher } from '@/src/shared/api/httpClient'
import { ClientToCreate } from '../types/client'

interface ApiResponse<T> {
    data?: T;
    error?: string;
}

interface ClientResponse {
    client_id: number;
}

export const createClient = async (client: ClientToCreate): Promise<number> => {
    const response = await fetcher.post<ApiResponse<ClientResponse>>('/client/create', client)
    console.log(response)
    
    // Si no hay data o no hay client_id, lanzar un error con el mensaje del servidor si existe
    if (!response?.client_id) {
        throw new Error(response.error || 'Error al crear el cliente: No se recibió ID del cliente')
    }
    
    return response.client_id
}

export const deleteClient = async (clientId: number): Promise<void> => {
    await fetcher.delete(`/client/delete/${clientId}`)
} 
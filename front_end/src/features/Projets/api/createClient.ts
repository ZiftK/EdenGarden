import { fetcher } from '@/src/shared/api/httpClient'
import { ClientToCreate } from '../types/client'

export const createClient = async (client: ClientToCreate) => {
    const response = await fetcher.post('/client/create', client)
    return response.data?.client_id
}

export const deleteClient = async (clientId: number) => {
    await fetcher.delete(`/client/${clientId}`)
} 
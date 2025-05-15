import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"

export default async function deleteEmployee(id: string) {
    try {
        await fetcher.delete(`${endpoints.employeeDelete}/${id}`)   
    } catch (error) {
        console.error('Error al eliminar el empleado:', error)
        throw new Error('Error al eliminar el empleado')
    }
}
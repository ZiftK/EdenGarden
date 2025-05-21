import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Employee } from "@/src/shared/types"

export async function getEmployees(): Promise<Employee[]> {
	try {
		const response = await fetcher.get<{message: string, data: Employee[]}>(`${endpoints.employees}`)
		if (!response || !response.data) {
			throw new Error('No se encontraron empleados')
		}
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error al obtener los empleados:', error)
		throw new Error('Error al obtener los empleados')
	}
}

import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Employee } from "@/src/shared/types"

export async function getLeaders(): Promise<Employee[]> {
    try {
		const dataLeaders: Employee[] = await fetcher.get<Employee[]>(`${endpoints.employees}`)
		if (!dataLeaders) throw new Error('No se encontraron empleados')
		const leaders = dataLeaders.filter((employee) => employee.rol === 'leader')
		return leaders
	} catch (error) {
		console.error('Error al obtener los empleados:', error)
		throw new Error('Error al obtener los empleados')
	}
}
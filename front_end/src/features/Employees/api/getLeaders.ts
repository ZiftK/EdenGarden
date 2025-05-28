import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { Employee } from "@/src/shared/types"

export async function getLeaders(): Promise<Employee[]> {
    try {
		const response = await fetcher.get<{message: string, data: Employee[]}>(`${endpoints.employees}`)
		if (!response || !response.data) {
			throw new Error('No se encontraron empleados')
		}
		const leaders = response.data.filter((employee) => 
			employee.rol === 'lider' && !employee.fk_equipo
		)
		console.log('Leaders found:', leaders)
		return leaders
	} catch (error) {
		console.error('Error al obtener los empleados:', error)
		throw new Error('Error al obtener los empleados')
	}
}
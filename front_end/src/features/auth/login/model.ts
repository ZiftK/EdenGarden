import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient";
import { Employee } from "@/src/shared/types";

interface LoginResponse {
    success: boolean;
    employee: Employee | null;
    message: string;
}

export async function loginUser(data: {expediente: string, clave: string}) {
    try {
        const response = await fetcher.post<LoginResponse>(endpoints.login, {
            expediente: data.expediente,
            clave: data.clave
        })

        if (!response.success) {
            throw new Error(response.message)
        }

        if (!response.employee) {
            throw new Error("No se recibieron datos del empleado")
        }

        return response.employee
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error("Error al iniciar sesión")
    }
}
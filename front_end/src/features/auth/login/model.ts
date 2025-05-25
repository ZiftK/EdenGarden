import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient";
import { Employee } from "@/src/shared/types";

interface LoginResponse {
    success: boolean;
    employee: Employee;
    message: string;
}

export async function loginUser(data: {expediente: string, clave: string}) {
    const response = await fetcher.post<LoginResponse>(endpoints.login, {
        expediente: data.expediente,
        clave: data.clave
    })

    if (!response.success) {
        throw new Error(response.message)
    }

    return response.employee
}
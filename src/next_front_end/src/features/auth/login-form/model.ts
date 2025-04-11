import { endpoints } from "@/src/shared/api/endpoints"
import { httpFunction } from "@/src/shared/api/httpClient";

export async function loginUser(data: {exp: string, password: string}){
    return httpFunction<{token: string}>(endpoints.login, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}
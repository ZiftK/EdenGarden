import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient";
import { decodeToken } from "@/src/entities/user/lib/decodeToken"

interface LoginResponse{
    token: string;
}

export async function loginUser(data: {exp: string, password: string}) {
    const {token} = await fetcher.post<LoginResponse>(endpoints.login,{
        id: data.exp,
        password: data.password
    })

    const user = decodeToken(token)
    return user
}
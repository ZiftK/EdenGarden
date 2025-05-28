import { fetcher } from "@/src/shared/api/httpClient"
import { ShortTeam } from "@/src/shared/types"

export const updateTeam = async (id: string, members: ShortTeam["empleados"]) => {
    return await fetcher.put(`/api/teams/${id}`, { members })
}
import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { ShortTeam } from "@/src/shared/types"; 

export async function getTeams(): Promise<ShortTeam[]> {
    // const res = await fetcher.get(endpoints.teams)

    return [
            {
                name: "Equipo 1",
                leaderName: { name: "Ruth Viveros" },
                members: [
                    {role: "leader", name: "Ruth Viveros", id: "123456", email: "ruth@gmail.com", phone_number: "12344567", position: "lider", salary: 2000},
                    {role: "user", name: "Martín Herrera López", id: "12356", email: "martin@gamil.com", phone_number: "1234452567", position:"Diseñador", salary: 2000},
                    {role: "user", name: "Javier López", id: "86344", email: "javier@gmail.com", phone_number: "12314567", position:"Ing. Civil", salary: 2000},
                    {role: "user", name: "Valentina Rojas Martínez", id: "987654", email: "valentina@gmail.com", phone_number: "12344567", position:"Arquitecta", salary: 2000},
                ]
            },
            {
                name: "Equipo 4",
                leaderName: { name: "Ruth Viveros" },
                members: [
                    {role: "leader", name: "Ruth Viveros", id: "123456", email: "ruth@gmail.com", phone_number: "12344567", position: "lider", salary: 2000},
                    {role: "user", name: "Martín Herrera López", id: "12356", email: "martin@gamil.com", phone_number: "1234452567", position:"Diseñador", salary: 2000},
                    {role: "user", name: "Javier López", id: "86344", email: "javier@gmail.com", phone_number: "12314567", position:"Ing. Civil", salary: 2000},
                    {role: "user", name: "Valentina Rojas Martínez", id: "987654", email: "valentina@gmail.com", phone_number: "12344567", position:"Arquitecta", salary: 2000},
                ]
            },
            {
                name: "Equipo 2",
                leaderName: { name: "Ruth Viveros" },
                members: [
                    {role: "leader", name: "Ruth Viveros", id: "123456", email: "ruth@gmail.com", phone_number: "12344567", position: "lider", salary: 2000},
                    {role: "user", name: "Martín Herrera López", id: "12356", email: "martin@gamil.com", phone_number: "1234452567", position:"Diseñador", salary: 2000},
                    {role: "user", name: "Javier López", id: "86344", email: "javier@gmail.com", phone_number: "12314567", position:"Ing. Civil", salary: 2000},
                    {role: "user", name: "Valentina Rojas Martínez", id: "987654", email: "valentina@gmail.com", phone_number: "12344567", position:"Arquitecta", salary: 2000},
                ]
        },
    ]
}

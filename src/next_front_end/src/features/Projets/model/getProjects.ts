// import { endpoints } from "@/src/shared/api/endpoints"
// import { fetcher } from "@/src/shared/api/httpClient"
import { Project } from "./types"
import { getTeams } from "../../Teams/api/getTeams"
import bgHouse1 from "@/public/assets/Project_1.jpg"

export default async function getProjects(): Promise<Project[]> {
    // try{
    //     const dataProjects: Project[] = await fetcher.get(`${endpoints.projects}`)
    //     if (!dataProjects) {
    //         throw new Error('No se encontraron proyectos')
    //     }
    //     return dataProjects
    // } catch (error) {
    //     console.error('Error al obtener los proyectos:', error)
    //     throw new Error('Error al obtener los proyectos')
    //     return []
    // }

    const team = await getTeams()
    
    return [
        {
            name: "Jardin Casa Voulsen",
            teams: team[0],
            calendar: {
                current_sprint:{
                    initial_date: new Date("2023-10-01"),
                    final_date: new Date("2023-10-15")
                },
                intial_date: new Date("2025-03-01"),
                final_date: new Date("2025-12-01"),
                non_working_days: [
                    new Date("2023-10-12"),
                    new Date("2023-10-13"),
                    new Date("2023-10-14"),
                ]
            },
            image: bgHouse1,
            price: 10000,
            clientData: {
                name: "Louis Cervantes",
                addressProject: "Calle Falsa 123",
                phone: "555-1234",
                email: "louis_cervantes@gmail.com"
            }
        }
    ]
}
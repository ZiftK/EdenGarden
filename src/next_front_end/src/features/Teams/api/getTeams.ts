import { endpoints } from "@/src/shared/api/endpoints"
import { fetcher } from "@/src/shared/api/httpClient"
import { ShortTeam } from "@/src/shared/types"; 

export async function getTeams(): Promise<ShortTeam[]> {
    // const res = await fetcher.get(endpoints.teams)

    return [
            {
                name: "Equipo 1",
                leader: {
                    id: 'EMP001',
                    name: 'Luis Torres',
                    phone_number: '555-123-4567',
                    email: 'luis.torres@empresa.com',
                    salary: 45000,             
                    role: 'leader',
                    position: 'Frontend Developer',
                },
                members: [
                    {
                        id: 'EMP004',
                        name: 'Elena Ruiz',                        
                        phone_number: '555-456-7890',
                        email: 'elena.ruiz@empresa.com',
                        salary: 50000,
                        role: 'user',
                        position: 'Fullstack Developer',
                    },
                    {
                        id: 'EMP005',
                        name: 'Carlos Méndez',
                        phone_number: '555-567-8901',
                        email: 'carlos.mendez@empresa.com',
                        salary: 38000,
                        role: 'user',
                        position: 'QA Analyst',
                    },
                    {
                        id: 'EMP006',
                        name: 'María Fernández',                      
                        phone_number: '555-678-9012',
                        email: 'maria.fernandez@empresa.com',
                        salary: 53000,
                        role: 'admin',
                        position: 'Product Owner',
                    }
                ]
            }
    ]
}

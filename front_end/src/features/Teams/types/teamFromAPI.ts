import { Employee } from "@/src/shared/types"

export type TeamToCreate = {
    nombre: string;
    lider: number;
    empleados: Employee[];
}

export type Team = {
    id_equipo: number;
    lider: Employee;
    empleados: Employee[];
}
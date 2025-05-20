
import { Client, ClientToCreate } from "./client"
import { Team } from "../../Teams/types/teamFromAPI"
import { ShortTeam } from "@/src/shared/types"
import { Date } from "./calendario"


export interface ProjectToCreate {
    nombre: string;
    descripcion?: string;
    estado: string;
    costo: number;
    cliente: number;
    equipo: number;
}

export interface ProjectBase {
    nombre: string;
    descripcion?: string;
    estado: string;
    costo: number;
    img: string;
    calendario: ProjectCalendar;
    id_proyecto?: number;
}


export interface ProjectFromAPI extends ProjectBase {
    cliente: Client;  
    equipo?: Team;    
}

export interface Project extends ProjectBase {
    equipo?: ShortTeam;
    cliente?: ClientToCreate;
}


export type ProjectCalendar = {
    fecha_inicio?: Date;
    fecha_fin?: Date;
    dias_no_laborables?: Date[];
    current_sprint?: SprintSchedule;
}



type SprintSchedule = {
    nombre: string;
    initial_date: Date;
    final_date: Date;
}

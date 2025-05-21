import { Client, ClientToCreate, ClientFromAPI } from "./client"
import { Team } from "../../Teams/types/teamFromAPI"
import { ShortTeam } from "@/src/shared/types"
import { Date, ProjectCalendarToCreate } from "./calendario"


export interface ProjectToCreate {
    nombre: string;
    descripcion: string;
    estado: string;
    costo: number;
    cliente: number;
    equipo: number;
    img?: string;
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
    cliente: ClientFromAPI;  
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

export type ProjectSendToAPI<
    TCliente = ClientToCreate,
    TCalendario = ProjectCalendarToCreate,
    TEquipo = ShortTeam
> = Omit<ProjectToCreate, 'cliente' | 'equipo'> & {
    id_proyecto: number;
    cliente: TCliente;
    calendario: TCalendario;
    equipo: TEquipo;
    img: string;
};
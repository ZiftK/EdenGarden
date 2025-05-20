import { StaticImageData } from "next/image"
import { Client } from "./client"
import { Team } from "../../Teams/types/teamFromAPI"
import { ProjectCalendarFromAPI } from "./calendario"

export type ProjectToCreate = {
    id_proyecto?: number;
    calendario: ProjectCalendarFromAPI
    equipo?: Team[]
    cliente: Client;
    img : string | StaticImageData;
    // costo?: number;
    // estado: string;
    // descripcion: string;
    // nombre: string;
    // img?: string | StaticImageData;
}

export interface Project extends Client, ProjectToCreate {

}


export type ProjectCalendar = {
    fecha_inicio?: date;
    fecha_fin?: date;
    dias_no_laborables?: Date[];
    current_sprint?: SprintSchedule;
}



type SprintSchedule = {
    nombre: string;
    initial_date: Date;
    final_date: Date;
}

export type date = 
    {
        dia: number;
        mes: number;
        anno: number;
    }

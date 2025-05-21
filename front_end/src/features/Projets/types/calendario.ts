import { EnumMonths } from "./time_enums"

export type Time = {
    hora: number;
    minuto: number;
    segundo: number;
}

export type Date = {
    dia: number;
    mes: EnumMonths;
    anno: number;
}

export interface ProjectCalendarFromAPI {
    sprintActual: Sprint;
}

export type Sprint = {
    id_sprint: number;
    nombre: string;
    fecha_inicial: Date;
    fecha_final: Date;
    hora_inicial: string;
    hora_final: string;
    location: string;
}

export type ProjectCalendarToCreate = {
    fecha_inicio: Date;
    fecha_fin: Date;
}
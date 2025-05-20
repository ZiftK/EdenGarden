import { ShortTeam } from "@/src/shared/types"
import { StaticImageData } from "next/image"

export type Project = {
    nombre: string;
    descripcion: string;
    estado: string;
    costo: number;
    cliente: {
        nombre: string;
        direccion: string;
        telefono: string;
        email: string;
    }
    equipo: ShortTeam
    id_proyecto: number;
    calendario: ProjectCalendar
    img?: string | StaticImageData;

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


type time = {
    hora: number;
    minuto: number;
    segundo: number;
}
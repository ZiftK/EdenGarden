import { ShortTeam } from "@/src/shared/types"
import { StaticImageData } from "next/image"

export type Project = {
    nombre: string;
    id_proyecto: string
    equipo: ShortTeam
    calendario: ProjectCalendar
    img?: StaticImageData;
    costo: string;
    cliente: {
        nombre: string;
        direccion: string;
        telefono: string;
        email: string;
    }
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


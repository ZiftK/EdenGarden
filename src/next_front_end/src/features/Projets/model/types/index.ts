import { ShortTeam } from "@/src/shared/types"
import { StaticImageData } from "next/image"

export type Project = {
    name: string;
    id: string
    teams: ShortTeam
    calendar: ProjectCalendar
    image: StaticImageData;
    price: string;
    clientData: {
        name: string;
        addressProject: string;
        phone: string;
        email: string;
    }
}

export type ProjectCalendar = {
    intial_date: Date;
    final_date: Date;
    non_working_days: Date[];
    current_sprint: SprintSchedule;
}

type SprintSchedule = {
    initial_date: Date;
    final_date: Date;
}
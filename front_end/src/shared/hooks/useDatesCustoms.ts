import { date } from "@/src/features/Projets/types";

export function parseDateStringToCustomDate(dateStr: string): date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return {
        dia: day,
        mes: month,
        anno: year,
    };
}

export function customDateToDateString(d: date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.anno}-${pad(d.mes)}-${pad(d.dia)}`;
}

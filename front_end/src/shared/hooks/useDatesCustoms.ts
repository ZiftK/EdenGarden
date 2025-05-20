import { date } from "@/src/features/Projets/types";

export function parseDateStringToCustomDate(dateStr: string): date {
    const [anno, mes, dia] = dateStr.split('-').map(Number);
    return {
        dia,
        mes,
        anno,
    };
}

export function customDateToDateString(d: date): string {
    if (!d) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.anno}-${pad(d.mes)}-${pad(d.dia)}`;
}

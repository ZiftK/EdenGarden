import { Date } from "@/src/features/Projets/types/calendario";

export function parseDateStringToCustomDate(dateStr: string): Date {
    const [anno, mes, dia] = dateStr.split('-').map(Number);
    return {
        dia,
        mes,
        anno,
    };
}

export function customDateToDateString(d: Date): string {
    if (!d) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.anno}-${pad(d.mes)}-${pad(d.dia)}`;
}

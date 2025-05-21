import { Date } from "@/src/features/Projets/types/calendario";
import { EnumMonths } from "@/src/features/Projets/types/time_enums";

export function parseDateStringToCustomDate(dateStr: string): Date {
    const [anno, mesStr, dia] = dateStr.split('-').map(Number);
    return {
        dia,
        mes: mesStr as EnumMonths,
        anno,
    };
}

export function customDateToDateString(d: Date): string {
    if (!d) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.anno}-${pad(d.mes)}-${pad(d.dia)}`;
}

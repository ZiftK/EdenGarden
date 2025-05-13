import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays} from 'date-fns'

export function getMonthDays( date: Date) {
    const startDate = startOfWeek(startOfMonth(date), {weekStartsOn: 1})
    const endDate = endOfWeek(endOfMonth(date), {weekStartsOn: 1})

    const days = []
    let current = startDate
    while (current <= endDate) {
        days.push(current)
        current = addDays(current, 1)
    }

    return days
}
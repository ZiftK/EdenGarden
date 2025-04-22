import { format, isSameWeek } from "date-fns"
import { getMonthDays } from "../model/getMonthDays"

export default function CalendarDesktop({date}: {date: Date}) {
    const allDays = getMonthDays(date)
    const currentWeek = allDays.filter(day => isSameWeek(day, date, {weekStartsOn:1}))

    return(
        <div className="w-full max-w-[450px] bg-[rgba(56,86,24,0.69)] px-4 pt-1.5 pb-2.5 rounded-lg flex flex-col justify-center items-center mt-2">
            <h3>{format(date, 'MMMM')}</h3>

            <div className="grid grid-cols-7 gap-x-5 gap-y-0.5 mt-2 text-center md:gap-x-10 md:gap-y-1 ">
                {["l","m","m","j","v","s","d"].map((day, index) =>(
                    <div key={index} className={day === "s" || day === "d"
                        ? "text-gray-100/15"
                        : "text-gray-100/35"}>{day}</div>
                ))}

                {currentWeek.map((day, index) => (
                    <div key={index}>{format(day, 'd')}</div>
                ))}
            </div>
        </div>
    )
}
import { format, isSameWeek } from "date-fns"
import { getMonthDays } from "../model/getMonthDays"

export default function CalendarDesktop({date}: {date: Date}) {
    const allDays = getMonthDays(date)
    const currentWeek = allDays.filter(day => isSameWeek(day, date, {weekStartsOn:1}))
    const currentDay = currentWeek.find(day => day.getDate() === date.getDate())

    return(
        <div className="w-full max-w-[450px] bg-[rgba(56,86,24,0.69)] px-4 pt-1.5 pb-2.5 rounded-lg flex flex-col justify-center items-center mt-2">
            <h3 className="text-lg">{format(date, 'MMMM')}</h3>

            <div className="flex flex-col gap-x-5 gap-y-0.5 mt-2 text-center ">
                <div
                    className="flex gap-x-1 md:gap-x-10 md:gap-y-1 "
                >
                    {["l","m","m","j","v","s","d"].map((day, index) =>(
                    <div key={index} className={day === "s" || day === "d"
                        ? "text-gray-100/15 w-full text-sm"
                        : "text-gray-100/35 w-full text-sm"}>{day}</div>
                    ))}
                </div>

                <div
                    className="flex gap-x-1 md:gap-x-10 md:gap-y-1 "
                >
                {currentWeek.map((day, index) => (
                    <div
                    key={index}
                    className={`w-8 h-8 flex text-sm items-center justify-center rounded-full ${
                        currentDay === day ? 'bg-[var(--green-dark-500)]' : ''
                    }`}
                    >
                        {format(day, 'd')}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}
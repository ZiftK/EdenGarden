import CalendarDesktop from "../../../../entities/calendar/ui/CalendarDesktop";
import CalendarMobile from "../../../../entities/calendar/ui/CalendarMobile";

export default function Calendar() {
    const date = new Date()

    return (
    <>
        <div className="hidden lg:block">
            <CalendarDesktop />
        </div>
        <div className="block lg:hidden">
            <CalendarMobile date={date}/>
        </div>
    </>
    )
}
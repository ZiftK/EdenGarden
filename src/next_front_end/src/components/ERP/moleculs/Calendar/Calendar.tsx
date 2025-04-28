import CalendarDesktop from "../../../../entities/calendar/ui/CalendarDesktop";
import CalendarMobile from "../../../../entities/calendar/ui/CalendarMobile";

export default function Calendar() {
    const date = new Date()

    return (
    <>
        <CalendarDesktop />
        <CalendarMobile date={date}/>

    </>
    )
}
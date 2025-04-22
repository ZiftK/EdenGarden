import CalendarDesktop from "./CalendarDesktop";
import CalendarMobile from "./CalendarMobile";

export default function Calendar() {
  return (
    <>
      <div className="hidden lg:block">
        <CalendarDesktop />
      </div>
      <div className="block lg:hidden">
        <CalendarMobile />
      </div>
    </>
  );
}
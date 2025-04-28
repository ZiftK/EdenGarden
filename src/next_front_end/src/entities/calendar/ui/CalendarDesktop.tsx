"use client";

import { useState } from "react";
import { 
  format, addMonths, subMonths, 
  startOfMonth, endOfMonth, eachDayOfInterval, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay 
} from "date-fns";

export default function CalendarButtons() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const handlePrevMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  return (
    <div className="hidden xl:flex w-full max-w-[450px] bg-[rgba(24,44,2)] p-4 rounded-lg flex-col items-center mt-2 select-none">
      
      {/* HEADER: Botones + Mes */}
      <div className="flex items-center justify-around w-full mb-4">
        <button 
          onClick={handlePrevMonth} 
          className="text-white text-xs p-1 rounded-full hover:bg-white/10 transition"
        >
          {"<"}
        </button>

        <h3 className="text-md font-medium">
          {format(currentDate, "MMMM")}
        </h3>

        <button 
          onClick={handleNextMonth} 
          className="text-white text-xs p-1 rounded-full hover:bg-white/10 transition"
        >
          {">"}
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 text-center w-full">
        {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
          <div key={index} className="text-gray-100/40 text-[10px] font-semibold">
            {day}
          </div>
        ))}

        {/* Días del mes */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] ${
              isSameDay(day, new Date()) 
                ? "bg-[var(--green-dark-500)]" 
                : !isSameMonth(day, currentDate) 
                  ? "text-gray-400/20" 
                  : "text-white/80"
            }`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}
from pydantic import BaseModel
from typing import Optional
from .time_enums import EnumDays, EnumMonths


class Time(BaseModel):
    hours: int
    minutes: int
    seconds: int


class Date(BaseModel):
    day: int
    month: EnumMonths
    year: int

    def __hash__(self):
        return hash((self.day, self.month, self.year))


class ScheduleData(BaseModel):
    is_working_day: bool
    initial_time: Optional[Time]
    final_time: Optional[Time]
    location: Optional[str]


class DayTemplate(BaseModel):
    day: EnumDays
    schedule: ScheduleData

    def __hash__(self):
        return hash((self.day.value))


class DateTemplate(BaseModel):
    date: Date
    schedule: ScheduleData

    def __hash__(self):
        return self.date.__hash__()

class DateSchedule(BaseModel):
    date: Date
    schedule: ScheduleData

class ScheduleTemplates(BaseModel):
    by_date: Optional[list[DateTemplate]]
    by_day: Optional[list[DayTemplate]]
    default: ScheduleData


class SprintDates(BaseModel):
    initial_date: Date
    final_date: Date


class ProjectCalendar(BaseModel):
    initial_date: Date
    final_date: Date
    schedule_templates: ScheduleTemplates
    current_sprint: SprintDates

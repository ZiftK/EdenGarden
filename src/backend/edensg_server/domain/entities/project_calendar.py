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


class ScheduleData(BaseModel):
    is_working_day: bool
    initial_time: Optional[Time]
    final_time: Optional[Time]
    location: Optional[str]


class DayTemplate(BaseModel):
    day: EnumDays
    schedule: ScheduleData


class DateTemplate(BaseModel):
    date: Date
    schedule: ScheduleData


class ScheduleTemplates(BaseModel):
    by_date: Optional[list[DateTemplate]]
    by_day: Optional[list[DayTemplate]]


class SprintDates(BaseModel):
    initial_date: Date
    final_date: Date


class ProjectCalendar(BaseModel):
    initial_date: Date
    final_date: Date
    schedule_templates: ScheduleTemplates
    current_sprint: SprintDates

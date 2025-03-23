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
    initial_time: Time
    final_time: Time
    location: str


class DayTemplate(BaseModel):
    day: EnumDays
    schedule_data: ScheduleData


class DaySchedule(BaseModel):
    date: Date
    is_working_day: bool
    schedule_data: Optional[ScheduleData]


class SprintSchedule(BaseModel):
    initial_date: Date
    final_date: Date

class DateTemplate(BaseModel):
    date: Date
    initial_time: Time
    final_time: Time

class DayTemplate(BaseModel):
    day: EnumDays
    initial_time: Time
    final_time: Time

class ScheduleTemplates(BaseModel):
    by_date: Optional[DateTemplate]
    by_day: Optional[DayTemplate]

class ProjectCalendar(BaseModel):
    initial_date: Date
    final_date: Date
    not_working_days: Optional[list[Date]]
    current_sprint: SprintSchedule

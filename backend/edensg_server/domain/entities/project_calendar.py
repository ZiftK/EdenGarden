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

<<<<<<< HEAD:backend/edensg_server/domain/entities/project_calendar.py
=======
    def __hash__(self):
        return hash((self.day, self.month, self.year))

>>>>>>> e8352c732b995c8fbd4a2a3f8a130a2122f9b9b9:src/backend/edensg_server/domain/entities/project_calendar.py

class ScheduleData(BaseModel):
    is_working_day: bool
    initial_time: Optional[Time]
    final_time: Optional[Time]
    location: Optional[str]



class DayTemplate(BaseModel):
    day: EnumDays
    schedule: ScheduleData

<<<<<<< HEAD:backend/edensg_server/domain/entities/project_calendar.py

class DaySchedule(BaseModel):
=======
    def __hash__(self):
        return hash((self.day.value))


class DateTemplate(BaseModel):
>>>>>>> e8352c732b995c8fbd4a2a3f8a130a2122f9b9b9:src/backend/edensg_server/domain/entities/project_calendar.py
    date: Date
    schedule: ScheduleData

<<<<<<< HEAD:backend/edensg_server/domain/entities/project_calendar.py

class SprintSchedule(BaseModel):
=======
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
>>>>>>> e8352c732b995c8fbd4a2a3f8a130a2122f9b9b9:src/backend/edensg_server/domain/entities/project_calendar.py
    initial_date: Date
    final_date: Date


class ProjectCalendar(BaseModel):
    initial_date: Date
    final_date: Date
<<<<<<< HEAD:backend/edensg_server/domain/entities/project_calendar.py
    non_working_days: Optional[list[Date]]
    current_sprint: SprintSchedule
=======
    schedule_templates: ScheduleTemplates
    current_sprint: SprintDates
>>>>>>> e8352c732b995c8fbd4a2a3f8a130a2122f9b9b9:src/backend/edensg_server/domain/entities/project_calendar.py

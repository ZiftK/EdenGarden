from pydantic import BaseModel
from typing import Optional
from .time_enums import EnumDays, EnumMonths
from .client import Client

class Time(BaseModel):
    hora: int
    minuto: int
    segundo: int

    def __str__(self):
        return f"{self.hora}:{self.minuto}:{self.segundo}"


class Date(BaseModel):
    dia: int
    mes: EnumMonths
    anno: int

    def __hash__(self):
        return hash((self.dia, self.mes, self.anno))
    
    def __str__(self):
        return f"{self.anno}-{self.mes.value}-{self.dia}"


class ScheduleTemplate(BaseModel):
    es_laborable: bool
    hora_inicial: Optional[Time]
    hora_final: Optional[Time]
    locacion: Optional[str]



class DayTemplate(BaseModel):
    dia: EnumDays
    horario: ScheduleTemplate


class DaySchedule(BaseModel):
    def __hash__(self):
        return hash((self.dia.value))


class DateTemplate(BaseModel):
    fecha: Date
    horario: ScheduleTemplate


class SprintSchedule(BaseModel):
    def __hash__(self):
        return self.fecha.__hash__()

class ScheduleTemplates(BaseModel):
    by_date: Optional[list[DateTemplate]] = None
    by_day: Optional[list[DayTemplate]] = None
    default: Optional[ScheduleTemplate] = None


class SprintDates(BaseModel):
    nombre: str
    fecha_inicial: Date
    fecha_final: Date


class ProjectCalendarToCreate(BaseModel):
    fecha_inicio: Date
    fecha_fin: Date

class ProjectCalendar(ProjectCalendarToCreate):
    dias_no_laborables: Optional[list[Date]] = None
    sprint_actual: Optional[SprintDates] = None
    plantillas_horario: ScheduleTemplates

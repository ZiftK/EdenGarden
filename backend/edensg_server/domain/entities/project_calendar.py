from typing import Optional
from pydantic import BaseModel
from .time_enums import EnumDays, EnumMonths

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


class Sprint(BaseModel):
    id_sprint: Optional[int] = None
    nombre: str
    fecha_inicial: Date
    fecha_final: Date
    hora_inicial: Time
    hora_final: Time
    locacion: Optional[str] = None


class ProjectCalendarToCreate(BaseModel):
    fecha_inicio: Date
    fecha_fin: Date

class ProjectCalendar(ProjectCalendarToCreate):
    sprint_actual: Optional[Sprint] = None

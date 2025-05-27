from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AttendanceBase(BaseModel):
    fk_empleado: int
    fecha: datetime
    hora_entrada: datetime
    hora_salida: Optional[datetime] = None
    horas_trabajadas: Optional[str] = None
    horas_extra: Optional[str] = None

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceUpdate(BaseModel):
    hora_salida: datetime

class Attendance(AttendanceBase):
    id_asistencia: int

    class Config:
        from_attributes = True 
from typing import Optional
from pydantic import BaseModel
from .project_calendar import Date, Time

class Employee(BaseModel):
    id_empleado: Optional[int] = None
    nombre: str
    direccion: str
    telefono: str
    email: Optional[str] = None
    fecha_contratacion: Date
    fecha_salida: Optional[Date] = None  
    fecha_recontratacion: Optional[Date] = None
    clave: str
    rol: str
    puesto: str
    salario: float

class Attendance(BaseModel):
    id_asistencia: Optional[int] = None
    fk_empleado: int
    fecha: Date
    hora_entrada: str
    hora_salida: Optional[str] = None
    horas_trabajadas: Time
    horas_extra: Time
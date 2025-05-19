from typing import Optional
from pydantic import BaseModel
from .project_calendar import Date, Time

class Employee(BaseModel):
    id_empleado: Optional[int] = None
    nombre: str
    direccion: str
    telefono: str
    email: Optional[str] = None
    fecha_contratacion: str
    fecha_salida: Optional[str] = None  
    fecha_recontratacion: Optional[str] = None
    clave: str
    rol: str
    puesto: str
    salario: float
    img_url: Optional[str] = None

class Attendance(BaseModel):
    id_asistencia: Optional[int] = None
    fk_empleado: int
    fecha: Date
    hora_entrada: str
    hora_salida: Optional[str] = None
    horas_trabajadas: Time
    horas_extra: Time
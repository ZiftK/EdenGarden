from typing import Optional
from pydantic import BaseModel


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


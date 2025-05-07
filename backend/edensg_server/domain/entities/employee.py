from typing import Optional
from pydantic import BaseModel


class Employee(BaseModel):
    id_empleado: int
    nombre: str
    direccion: str
    telefono: str
    email: Optional[str]
    fecha_contratacion: str
    fecha_salida: Optional[str]
    fecha_recontratacion: Optional[str]
    clave: str
    rol: str
    puesto: str
    salario: float


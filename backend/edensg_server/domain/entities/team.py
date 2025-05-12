from typing import Optional
from pydantic import BaseModel
from .employee import Employee


class Team(BaseModel):
    id_equipo: int
    nombre: str
    lider: Employee
    empleados: Optional[list[Employee]] = None

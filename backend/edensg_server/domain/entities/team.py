from typing import Optional
from pydantic import BaseModel
from .employee import Employee

class TeamToCreate(BaseModel):
    nombre: str
    lider_id: int
    empleados_ids: Optional[list[int]] = None

class Team(BaseModel):
    id_equipo: int
    nombre: str
    lider: Employee
    empleados: Optional[list[Employee]] = None

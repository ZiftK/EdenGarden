from typing import Optional
from pydantic import BaseModel
from .employee import Employee

class TeamToCreate(BaseModel):
    nombre: str
    lider: int
    empleados: Optional[list[int]] = None

class Team(TeamToCreate):
    id_equipo: int
    lider: Employee
    empleados: Optional[list[Employee]] = None

from pydantic import BaseModel
from .team import Team
from typing import Optional
from .client import Client
from .project_calendar import ProjectCalendar


class Project(BaseModel):
    id_proyecto: Optional[int] = None
    nombre: str
    descripcion: Optional[str] = None
    estado: str
    costo: float
    cliente: Client
    equipo: Optional[Team] = None
    calendario: ProjectCalendar

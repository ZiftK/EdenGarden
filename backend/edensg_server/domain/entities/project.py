from pydantic import BaseModel
from .team import Team
from typing import Optional
from .client import Client
from .project_calendar import ProjectCalendar, ProjectCalendarToCreate


class ProjectToCreate(BaseModel):
    nombre: str
    descripcion: Optional[str] = None
    estado: str
    costo: float
    cliente: int
    equipo: int

class Project(ProjectToCreate):
    id_proyecto: Optional[int] = None
    calendario: ProjectCalendar
    equipo: Optional[Team] = None
    cliente: Client
    img: str

from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, DateSchedule
from .calendar_calc import get_working_days_on_sprint
from typing import List

class ViewSchedulesUseCase:
    def __init__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository

    async def execute(self, project_id: str) -> List[DateSchedule]:
        """
        Devuelve los horarios (días laborables y sus horarios) de un proyecto específico.
        Args:
            project_id: ID del proyecto
        Raises:
            ValueError: Si el proyecto no existe
        Returns:
            List[DateSchedule]: Lista de fechas y sus horarios
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto: Project = proyectos[0]
        calendario: ProjectCalendar = proyecto.calendar
        return get_working_days_on_sprint(calendario) 
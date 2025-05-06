from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar

class UpdateScheduleUseCase:
    def __init__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository

    async def execute(self, project_id: str, new_calendar: ProjectCalendar) -> None:
        """
        Modifica el calendario (horario) de un proyecto específico.
        Args:
            project_id: ID del proyecto
            new_calendar: Nuevo calendario (horario) para el proyecto
        Raises:
            ValueError: Si el proyecto no existe
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto: Project = proyectos[0]
        proyecto.calendar = new_calendar
        await self.project_repository.update_project_data(project_id, proyecto) 
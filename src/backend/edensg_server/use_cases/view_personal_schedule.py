from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository
from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, DateSchedule
from backend.edensg_server.domain.entities.project import Project
from .calendar_calc import get_working_days_on_sprint
from typing import List

class ViewPersonalScheduleUseCase:
    def __init__(self, employee_repository: EmployeeRepository, project_repository: ProjectRepository):
        self.employee_repository = employee_repository
        self.project_repository = project_repository

    async def execute(self, employee_id: int, project_id: str) -> List[DateSchedule]:
        """
        Devuelve el horario personal de un empleado en un proyecto específico.
        Args:
            employee_id: ID del empleado
            project_id: ID del proyecto
        Raises:
            ValueError: Si el empleado o el proyecto no existen
        Returns:
            List[DateSchedule]: Lista de fechas y horarios personales
        """
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto: Project = proyectos[0]
        calendario: ProjectCalendar = proyecto.calendar
        # Aquí podrías filtrar los horarios solo para el empleado si hay lógica específica
        return get_working_days_on_sprint(calendario) 
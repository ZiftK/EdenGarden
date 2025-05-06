from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.adapters.repository.team_repository_interface import TeamRepository
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.team import Team

class AssignTeamToProjectUseCase:
    def __init__(self, project_repository: ProjectRepository, team_repository: TeamRepository):
        self.project_repository = project_repository
        self.team_repository = team_repository

    async def execute(self, project_id: str, team_id: str) -> None:
        """
        Asigna un equipo a un proyecto, validando existencia y evitando duplicados.
        Args:
            project_id: ID del proyecto
            team_id: ID del equipo
        Raises:
            ValueError: Si el proyecto o el equipo no existen, o si el equipo ya está asignado
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto: Project = proyectos[0]

        equipos = await self.team_repository.find_teams(team_id, search_by="id")
        if not equipos:
            raise ValueError(f"El equipo con ID {team_id} no existe.")
        equipo: Team = equipos[0]

        # Validar que el equipo no esté ya asignado
        if any(t.name == equipo.name for t in proyecto.teams):
            raise ValueError(f"El equipo ya está asignado al proyecto.")

        # Asignar el equipo
        proyecto.teams.append(equipo)
        await self.project_repository.update_project_data(project_id, proyecto) 
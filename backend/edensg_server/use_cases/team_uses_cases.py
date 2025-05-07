from backend.edensg_server.adapters.repository.team_repository_interface import TeamRepository
from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.team import Team


class TeamUseCases:
    def __init__(self, team_repository: TeamRepository):
        self.team_repository = team_repository

    async def create_team(self, team: Team) -> None:
        """
        Crea un nuevo equipo de trabajo.
        Args:
            team: Equipo de trabajo a crear
        """
        await self.team_repository.create_team(team)

    async def assign_team_to_project(self, project_id: str, team_id: str) -> None:
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

    async def dissolve_team(self, team_id: str) -> None:
        """
        Disuelve (elimina) un equipo de trabajo si existe.
        Args:
            team_id: ID del equipo a disolver
        Raises:
            ValueError: Si el equipo no existe
        """
        equipos = await self.team_repository.find_teams(team_id, search_by="id")
        if not equipos:
            raise ValueError(f"El equipo con ID {team_id} no existe.")
        await self.team_repository.drop_team_data(team_id) 

    async def remove_team_from_project(self, 
        project_repository: ProjectRepository,
        team_repository: TeamRepository,
        project_id: str, team_id: str) -> None:
        """
        Retira un equipo de un proyecto, validando existencia y que el equipo esté asignado.
        Args:
            project_id: ID del proyecto
            team_id: ID del equipo
        Raises:
            ValueError: Si el proyecto o el equipo no existen, o si el equipo no está asignado
        """
        proyectos = await project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto: Project = proyectos[0]

        equipos = await self.team_repository.find_teams(team_id, search_by="id")
        if not equipos:
            raise ValueError(f"El equipo con ID {team_id} no existe.")
        equipo: Team = equipos[0]

        # Validar que el equipo esté asignado
        if not any(t.name == equipo.name for t in proyecto.teams):
            raise ValueError(f"El equipo no está asignado al proyecto.")

        # Retirar el equipo
        proyecto.teams = [t for t in proyecto.teams if t.name != equipo.name]
        await project_repository.update_project_data(project_id, proyecto) 

    async def update_team(self, team_id: str, data: Team) -> None:
        """
        Modifica la información de un equipo de trabajo si existe.
        Args:
            team_id: ID del equipo a modificar
            data: Nueva información del equipo (instancia de Team)
        Raises:
            ValueError: Si el equipo no existe
        """
        equipos = await self.team_repository.find_teams(team_id, search_by="id")
        if not equipos:
            raise ValueError(f"El equipo con ID {team_id} no existe.")
        await self.team_repository.update_team_data(team_id, data) 
    
    async def view_teams(self) -> list[Team]:
        """
        Devuelve todos los equipos de trabajo registrados.
        Returns:
            List[Team]: Lista de equipos de trabajo
        """
        equipos = await self.team_repository.find_teams("all", search_by="all")
        return equipos 

    async def get_team_by_id(self, team_id: str) -> Team:
        """
        Devuelve un equipo de trabajo por su ID.
        Args:
            team_id: ID del equipo
        Returns:
            Team: Equipo de trabajo
        """
        equipos = await self.team_repository.find_teams(team_id, search_by="id")
        if not equipos:
            raise ValueError(f"El equipo con ID {team_id} no existe.")
        return equipos[0]
    
    async def get_team_by_name(self, team_name: str) -> Team:
        """
        Devuelve un equipo de trabajo por su nombre.
        Args:
            team_name: Nombre del equipo
        Returns:
            Team: Equipo de trabajo
        """
        equipos = await self.team_repository.find_teams(team_name, search_by="name")
        if not equipos:
            raise ValueError(f"El equipo con nombre {team_name} no existe.")
        return equipos
        
    async def get_teams_by_employee_id(self, employee_id: str) -> list[Team]:
        """
        Devuelve todos los equipos de trabajo que contienen a un empleado específico.
        Args:
            employee_id: ID del empleado
        Returns:
            list[Team]: Lista de equipos que contienen al empleado
        Raises:
            ValueError: Si no se encuentran equipos con el empleado
        """
        equipos = await self.team_repository.find_teams(employee_id, search_by="employee_id")
        if not equipos:
            raise ValueError(f"No se encontraron equipos que contengan al empleado con ID {employee_id}.")
        return equipos
        

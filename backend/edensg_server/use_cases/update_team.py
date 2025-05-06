from backend.edensg_server.adapters.repository.team_repository_interface import TeamRepository
from backend.edensg_server.domain.entities.team import Team
from typing import Optional

class UpdateTeamUseCase:
    def __init__(self, team_repository: TeamRepository):
        self.team_repository = team_repository

    async def execute(self, team_id: str, data: Team) -> None:
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
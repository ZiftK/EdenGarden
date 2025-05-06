from backend.edensg_server.adapters.repository.team_repository_interface import TeamRepository
from backend.edensg_server.domain.entities.team import Team
from typing import List

class ViewTeamsUseCase:
    def __init__(self, team_repository: TeamRepository):
        self.team_repository = team_repository

    async def execute(self) -> List[Team]:
        """
        Devuelve todos los equipos de trabajo registrados.
        Returns:
            List[Team]: Lista de equipos de trabajo
        """
        equipos = await self.team_repository.find_teams("all", search_by="all")
        return equipos 
from backend.edensg_server.adapters.repository.team_repository_interface import TeamRepository

class DissolveTeamUseCase:
    def __init__(self, team_repository: TeamRepository):
        self.team_repository = team_repository

    async def execute(self, team_id: str) -> None:
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
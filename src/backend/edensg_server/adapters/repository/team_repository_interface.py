from abc import ABC
from backend.edensg_server.domain.entities.team import Team


class TeamRepository(ABC):

    async def create_team(self, data: Team) -> int:
        """Inserta un nuevo equipo en la base de datos."""

    async def find_teams(self, identifier: str, search_by: str = "id") -> list[Team]:
        """Busca equipos por un campo específico."""

    async def update_team_data(self, id: str, data: Team) -> None:
        """Actualiza la información de un equipo."""

    async def drop_team_data(self, id: int) -> None:
        """Elimina un equipo de la base de datos."""

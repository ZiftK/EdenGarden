from abc import ABC
from backend.edensg_server.domain.entities.team import Team
from typing import List

class TeamRepository(ABC):

    async def create_team(self, data: Team) -> int:
        """Inserta un nuevo equipo en la base de datos."""

    async def find_teams(self, identifier: str | int = "all", search_by: str = "id") -> List[Team]:
        """Busca equipos por un campo específico."""

    async def update_team_data(self, id: str | int, data: Team) -> None:
        """Actualiza la información de un equipo."""

    async def drop_team_data(self, id: int) -> None:
        """Elimina un equipo de la base de datos."""

    async def update_members(self, team_id: int, member_ids: List[int]) -> None:
        """Actualiza los miembros de un equipo."""

    async def remove_member(self, team_id: int, member_id: int) -> None:
        """Elimina un miembro de un equipo."""

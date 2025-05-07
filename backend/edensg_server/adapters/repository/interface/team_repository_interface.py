from abc import ABC, abstractmethod
from backend.edensg_server.domain.entities.team import Team


class TeamRepository(ABC):

    @abstractmethod
    async def create_team(self, data: Team) -> int:
        """Inserta un nuevo equipo en la base de datos."""

    @abstractmethod
    async def find_team(self, identifier: str | int = "all", search_by: str = "id") -> list[Team]:
        """Busca equipos por un campo específico."""

    @abstractmethod
    async def update_team_data(self, id: str | int, data: Team) -> None:
        """Actualiza la información de un equipo."""

    @abstractmethod
    async def drop_team_data(self, id: int) -> None:
        """Elimina un equipo de la base de datos."""

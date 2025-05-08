from abc import ABC, abstractmethod
from backend.edensg_server.domain.entities.team import Team


class TeamRepository(ABC):

    @abstractmethod
    async def create_team(self, data: Team) -> int:
        """Inserta un nuevo equipo en la base de datos."""

    @abstractmethod
    async def get_all_teams(self) -> list[Team]:
        """Obtiene todos los equipos de la base de datos."""
    
    @abstractmethod
    async def find_team_by_id(self, id: int) -> list[Team]:
        """Busca equipos por un campo específico."""

    @abstractmethod
    async def find_team_by_name(self, name: str) -> list[Team]:
        """Busca equipos por un campo específico."""


    @abstractmethod
    async def update_team_data(self, id: int, data: Team) -> None:
        """Actualiza la información de un equipo."""

    @abstractmethod
    async def delete_team_data(self, id: int) -> None:
        """Elimina un equipo de la base de datos."""


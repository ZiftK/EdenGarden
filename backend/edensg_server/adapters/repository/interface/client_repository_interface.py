from abc import ABC, abstractmethod
from backend.edensg_server.domain.entities.client import Client

class ClientRepository(ABC):

    @abstractmethod
    def create_client(self, data: Client) -> int:
        """Inserta un nuevo cliente en la base de datos."""

    @abstractmethod
    def get_all_clients(self) -> list[Client]:
        """Obtiene todos los clientes de la base de datos."""

    @abstractmethod
    def find_client_by_id(self, id: int) -> list[Client]:
        """Busca clientes por id."""

    @abstractmethod
    def find_clients_by_ids(self, ids: list[int]) -> list[Client]:
        """Busca clientes por ids."""
    
    @abstractmethod
    def find_client_by_email(self, email: str) -> list[Client]:
        """Busca clientes por email."""
    
    @abstractmethod
    def update_client_data(self, id: int, data: Client) -> None:
        """Actualiza la información de un cliente."""

    @abstractmethod
    def delete_client_data(self, id: int) -> None:
        """Elimina un cliente de la base de datos."""

from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.client import Client
from backend.edensg_server.adapters.repository.interface.client_repository_interface import ClientRepository
import asyncio

class ClientRepositorySB(ClientRepository):
    def __init__(self):
        self.client = supabase_client
        self.table = 'cliente'

    def create_client(self, data: Client) -> int:
        """Inserta un nuevo cliente en la base de datos."""
        data_dict = data.model_dump(exclude={'id_cliente'})
        response = self.client.table(self.table).insert(data_dict).execute()
        return response.data[0]['id_cliente']

    def get_all_clients(self) -> list[Client]:
        """Obtiene todos los clientes de la base de datos."""
        response = self.client.table(self.table).select('*').execute()
        return [Client(**client) for client in response.data]

    def find_client_by_id(self, id: int) -> list[Client]:
        """Busca clientes por id."""
        response = self.client.table(self.table).select('*').eq('id_cliente', id).execute()
        data = response.data[0]
        return Client(**data)

    def find_clients_by_ids(self, ids: list[int]) -> list[Client]:
        """Busca clientes por ids."""
        response = self.client.table(self.table).select('*').in_('id_cliente', ids).execute()
        return [Client(**client) for client in response.data]

    def find_client_by_email(self, email: str) -> list[Client]:
        """Busca clientes por email."""
        response = self.client.table(self.table).select('*').eq('email', email).execute()
        return [Client(**client) for client in response.data]

    def update_client_data(self, id: int, data: Client) -> None:
        """Actualiza la información de un cliente."""
        self.client.table(self.table).update(data.model_dump(exclude={'id_cliente'})).eq('id_cliente', id).execute()

    def delete_client_data(self, id: int) -> None:
        """Elimina un cliente de la base de datos."""
        self.client.table(self.table).delete().eq('id_cliente', id).execute()

async def main():
    repo = ClientRepositorySB()
    # Test get all clients
    clients = repo.get_all_clients()
    print(f"Found {len(clients)} clients")
    print(clients)

if __name__ == "__main__":
    asyncio.run(main())

client_sb_repository = ClientRepositorySB()

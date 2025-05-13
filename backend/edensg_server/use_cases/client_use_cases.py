from backend.edensg_server.adapters.repository.supb.client_repository_sb import client_sb_repository
from backend.edensg_server.domain.entities.client import Client, ClientToCreate

class ClientController:
    def __init__(self):
        self.client_repository = client_sb_repository
        
    def get_all_clients(self) -> list[Client]:
        """Obtiene todos los clientes."""
        try:
            clients = self.client_repository.get_all_clients()
            if not clients:
                return []
            return clients
        except Exception as e:
            raise Exception(f"Error al obtener los clientes: {str(e)}")
    
    def get_client_by_id(self, id: int) -> Client:
        """Obtiene un cliente por su ID."""
        try:
            client = self.client_repository.find_client_by_id(id)
            if not client:
                raise Exception(f"No se encontró el cliente con ID {id}")
            return client
        except Exception as e:
            raise Exception(f"Error al obtener el cliente: {str(e)}")
    
    def get_clients_by_ids(self, ids: list[int]) -> list[Client]:
        """Obtiene clientes por sus IDs."""
        try:
            clients = self.client_repository.find_clients_by_ids(ids)
            if not clients:
                return []
            return clients
        except Exception as e:
            raise Exception(f"Error al obtener los clientes: {str(e)}")
    
    def get_client_by_email(self, email: str) -> list[Client]:
        """Obtiene clientes por su email."""
        try:
            clients = self.client_repository.find_client_by_email(email)
            if not clients:
                return []
            return clients
        except Exception as e:
            raise Exception(f"Error al obtener los clientes: {str(e)}")
    
    def get_client_by_name(self, name: str) -> list[Client]:
        """Obtiene clientes por su nombre."""
        try:
            clients = self.client_repository.find_client_by_name(name)
            if not clients:
                return []
            return clients
        except Exception as e:
            raise Exception(f"Error al obtener los clientes: {str(e)}")
    
    def create_client(self, client: ClientToCreate) -> dict:
        """Crea un nuevo cliente."""
        try:
            # Verificar si ya existe un cliente con el mismo email
            if client.email:
                existing_clients = self.get_client_by_email(client.email)
                if existing_clients:
                    raise Exception(f"Ya existe un cliente con el email {client.email}")
            
            client_id = self.client_repository.create_client(client)
            return {
                'message': 'Cliente creado correctamente',
                'client_id': client_id
            }
        except Exception as e:
            raise Exception(f"Error al crear el cliente: {str(e)}")
    
    def update_client(self, id: int, client: ClientToCreate) -> dict:
        """Actualiza la información de un cliente."""
        try:
            # Verificar si el cliente existe
            existing_client = self.get_client_by_id(id)
            if not existing_client:
                raise Exception(f"No se encontró el cliente con ID {id}")
            
            # Verificar si el nuevo email ya está en uso por otro cliente
            if client.email and client.email != existing_client.email:
                clients_with_email = self.get_client_by_email(client.email)
                if clients_with_email and any(c.id_cliente != id for c in clients_with_email):
                    raise Exception(f"Ya existe otro cliente con el email {client.email}")
            
            self.client_repository.update_client_data(id, client)
            return {"message": "Cliente actualizado correctamente"}
        except Exception as e:
            raise Exception(f"Error al actualizar el cliente: {str(e)}")
    
    def delete_client(self, id: int) -> dict:
        """Elimina un cliente."""
        try:
            # Verificar si el cliente existe
            existing_client = self.get_client_by_id(id)
            if not existing_client:
                raise Exception(f"No se encontró el cliente con ID {id}")
            
            self.client_repository.delete_client_data(id)
            return {"message": "Cliente eliminado correctamente"}
        except Exception as e:
            raise Exception(f"Error al eliminar el cliente: {str(e)}") 
from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.models.contact import ContactMessage, ContactMessageCreate

class ContactRepositorySB:
    def __init__(self):
        self.client = supabase_client
        self.table = 'contact_messages'

    def create_message(self, data: ContactMessageCreate) -> dict:
        """Inserta un nuevo mensaje en la base de datos."""
        message_data = {
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "message": data.message
        }
        response = self.client.table(self.table).insert(message_data).execute()
        return response.data[0]

    def get_all_messages(self) -> list[dict]:
        """Obtiene todos los mensajes no eliminados."""
        response = self.client.table(self.table)\
            .select('*')\
            .neq('status', 'eliminado')\
            .order('created_at', desc=True)\
            .execute()
        return response.data

    def mark_as_read(self, message_id: str) -> None:
        """Marca un mensaje como leído."""
        self.client.table(self.table)\
            .update({'read': True})\
            .eq('id', message_id)\
            .execute()

    def update_status(self, message_id: str, status: str) -> None:
        """Actualiza el estado de un mensaje."""
        self.client.table(self.table)\
            .update({'status': status})\
            .eq('id', message_id)\
            .execute()

contact_repository = ContactRepositorySB() 
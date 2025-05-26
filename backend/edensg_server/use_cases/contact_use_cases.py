from typing import List
from ..domain.entities.contact import ContactMessage, ContactMessageCreate
from ..database import get_supabase_client

class ContactController:
    def __init__(self):
        self.supabase = get_supabase_client()

    def create_message(self, message: ContactMessageCreate) -> dict:
        """Create a new contact message"""
        try:
            response = self.supabase.table('contact_messages').insert(message.dict()).execute()
            return {"message": "Mensaje enviado correctamente"}
        except Exception as e:
            raise Exception(f"Error al crear el mensaje: {str(e)}")

    def get_messages(self) -> List[ContactMessage]:
        """Get all non-deleted contact messages"""
        try:
            response = self.supabase.table('contact_messages')\
                .select('*')\
                .neq('status', 'eliminado')\
                .order('created_at', desc=True)\
                .execute()
            return response.data
        except Exception as e:
            raise Exception(f"Error al obtener los mensajes: {str(e)}")

    def mark_as_read(self, message_id: str) -> dict:
        """Mark a message as read"""
        try:
            self.supabase.table('contact_messages')\
                .update({'read': True})\
                .eq('id', message_id)\
                .execute()
            return {"message": "Mensaje marcado como leído"}
        except Exception as e:
            raise Exception(f"Error al marcar el mensaje como leído: {str(e)}")

    def update_status(self, message_id: str, status: str) -> dict:
        """Update message status"""
        if status not in ['nuevo', 'prospecto', 'eliminado']:
            raise Exception("Estado no válido")
        
        try:
            self.supabase.table('contact_messages')\
                .update({'status': status})\
                .eq('id', message_id)\
                .execute()
            return {"message": f"Estado actualizado a {status}"}
        except Exception as e:
            raise Exception(f"Error al actualizar el estado: {str(e)}") 
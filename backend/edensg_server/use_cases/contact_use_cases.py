from typing import List, Literal
from ..domain.entities.contact import ContactMessage, ContactMessageCreate
from ..database import get_supabase_client
import uuid

class ContactController:
    def __init__(self):
        self.supabase = get_supabase_client()

    def create_message(self, message: ContactMessageCreate) -> dict:
        """Create a new contact message"""
        try:
            # Aseguramos que todos los campos requeridos estén presentes
            message_data = {
                "id": str(uuid.uuid4()),  # Generamos el UUID aquí
                "name": message.name,
                "email": message.email,
                "phone": message.phone,
                "message": message.message,
                "status": "nuevo",
                "read": False
            }
            response = self.supabase.table('contact_messages').insert(message_data).execute()
            return {"message": "Mensaje enviado correctamente"}
        except Exception as e:
            raise Exception(f"Error al crear el mensaje: {str(e)}")

    def get_messages(self) -> List[ContactMessage]:
        """Get all non-deleted contact messages"""
        try:
            response = self.supabase.table('contact_messages').select('*').neq('status', 'eliminado').execute()
            return [ContactMessage(**msg) for msg in response.data]
        except Exception as e:
            raise Exception(f"Error al obtener los mensajes: {str(e)}")

    def mark_as_read(self, id: str) -> dict:
        """Mark a message as read"""
        try:
            self.supabase.table('contact_messages').update({'read': True}).eq('id', id).execute()
            return {"message": "Mensaje marcado como leído"}
        except Exception as e:
            raise Exception(f"Error al marcar el mensaje como leído: {str(e)}")

    def update_status(self, id: str, status: Literal["nuevo", "prospecto", "cliente", "eliminado"]) -> dict:
        """Update message status"""
        valid_statuses = ["nuevo", "prospecto", "cliente", "eliminado"]
        if status not in valid_statuses:
            raise Exception(f"Estado no válido. Los estados válidos son: {', '.join(valid_statuses)}")
        
        try:
            self.supabase.table('contact_messages').update({'status': status}).eq('id', id).execute()
            return {"message": f"Estado actualizado a {status}"}
        except Exception as e:
            raise Exception(f"Error al actualizar el estado: {str(e)}") 
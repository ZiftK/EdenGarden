from fastapi import APIRouter, HTTPException, Depends
from ..models.contact import ContactMessage, ContactMessageCreate
from ..database import get_supabase_client
from typing import List

router = APIRouter(
    prefix="/contact",
    tags=["contact"]
)

@router.post("/messages")
async def create_message(message: ContactMessageCreate):
    """Crear un nuevo mensaje de contacto"""
    try:
        supabase = get_supabase_client()
        response = supabase.table('contact_messages').insert(message.dict()).execute()
        return {"message": "Mensaje enviado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/messages", response_model=List[ContactMessage])
async def get_messages():
    """Obtener todos los mensajes de contacto no eliminados"""
    try:
        supabase = get_supabase_client()
        response = supabase.table('contact_messages')\
            .select('*')\
            .neq('status', 'eliminado')\
            .order('created_at', desc=True)\
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/messages/{message_id}/read")
async def mark_as_read(message_id: str):
    """Marcar un mensaje como leído"""
    try:
        supabase = get_supabase_client()
        response = supabase.table('contact_messages')\
            .update({'read': True})\
            .eq('id', message_id)\
            .execute()
        return {"message": "Mensaje marcado como leído"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/messages/{message_id}/status")
async def update_status(message_id: str, status: str):
    """Actualizar el estado de un mensaje"""
    if status not in ['nuevo', 'prospecto', 'eliminado']:
        raise HTTPException(status_code=400, detail="Estado no válido")
    
    try:
        supabase = get_supabase_client()
        response = supabase.table('contact_messages')\
            .update({'status': status})\
            .eq('id', message_id)\
            .execute()
        return {"message": f"Estado actualizado a {status}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
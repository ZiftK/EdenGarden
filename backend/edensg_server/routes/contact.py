from fastapi import APIRouter, HTTPException, Depends
from ..models.contact import ContactMessage, ContactMessageCreate
from ..adapters.repository.supb.contact_repository_sb import contact_repository
from typing import List

router = APIRouter(
    prefix="/contact",
    tags=["contact"]
)

@router.post("/messages")
async def create_message(message: ContactMessageCreate):
    """Crear un nuevo mensaje de contacto"""
    try:
        response = contact_repository.create_message(message)
        return {"message": "Mensaje enviado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error al crear el mensaje: {str(e)}")

@router.get("/messages", response_model=List[ContactMessage])
async def get_messages():
    """Obtener todos los mensajes de contacto no eliminados"""
    try:
        return contact_repository.get_all_messages()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/messages/{message_id}/read")
async def mark_as_read(message_id: str):
    """Marcar un mensaje como leído"""
    try:
        contact_repository.mark_as_read(message_id)
        return {"message": "Mensaje marcado como leído"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/messages/{message_id}/status")
async def update_status(message_id: str, status: str):
    """Actualizar el estado de un mensaje"""
    if status not in ['nuevo', 'prospecto', 'eliminado']:
        raise HTTPException(status_code=400, detail="Estado no válido")
    
    try:
        contact_repository.update_status(message_id, status)
        return {"message": f"Estado actualizado a {status}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
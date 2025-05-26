from fastapi import APIRouter, HTTPException, status
from typing import List
from ....domain.entities.contact import ContactMessage, ContactMessageCreate
from ....use_cases.contact_use_cases import ContactController

router = APIRouter(prefix='/contact', tags=['Contact'])
contact_controller = ContactController()

@router.post('/messages', 
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {"description": "Mensaje enviado exitosamente"},
        400: {"description": "Error en los datos proporcionados"}
    })
async def create_message(message: ContactMessageCreate):
    try:
        return contact_controller.create_message(message)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/messages',
    response_model=List[ContactMessage],
    responses={
        200: {"description": "Lista de mensajes obtenida exitosamente"},
        400: {"description": "Error al obtener los mensajes"}
    })
async def get_messages():
    try:
        return contact_controller.get_messages()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch('/messages/{id}/read',
    response_model=dict,
    responses={
        200: {"description": "Mensaje marcado como leído"},
        400: {"description": "Error al marcar el mensaje"}
    })
async def mark_as_read(id: str):
    try:
        return contact_controller.mark_as_read(id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch('/messages/{id}/status',
    response_model=dict,
    responses={
        200: {"description": "Estado del mensaje actualizado"},
        400: {"description": "Error al actualizar el estado"}
    })
async def update_status(id: str, status: str):
    try:
        return contact_controller.update_status(id, status)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 
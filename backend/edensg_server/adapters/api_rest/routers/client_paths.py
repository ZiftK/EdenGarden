from fastapi import APIRouter, HTTPException, status
from backend.edensg_server.domain.entities.client import Client, ClientToCreate
from backend.edensg_server.use_cases.client_use_cases import ClientController
from typing import List

router = APIRouter(prefix='/client')

client_controller = ClientController()

@router.post('/create', 
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {"description": "Cliente creado exitosamente", "content": {"application/json": {"example": {"message": "Cliente creado correctamente", "client_id": 1}}}},
        400: {"description": "Error en los datos proporcionados"}
    })
async def create_client(client: ClientToCreate):
    try:
        return client_controller.create_client(client)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/id/{client_id}',
    response_model=Client,
    responses={
        200: {"description": "Cliente encontrado"},
        404: {"description": "Cliente no encontrado"}
    })
async def get_client_by_id(client_id: int):
    try:
        return client_controller.get_client_by_id(client_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get('/name/{name}',
    response_model=List[Client],
    responses={
        200: {"description": "Clientes encontrados exitosamente"},
        404: {"description": "No se encontraron clientes con ese nombre"}
    })
async def get_client_by_name(name: str):
    try:
        clients = client_controller.get_client_by_name(name)
        if not clients:
            raise HTTPException(status_code=404, detail=f"No se encontraron clientes con el nombre {name}")
        return clients
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/email/{email}',
    response_model=List[Client],
    responses={
        200: {"description": "Clientes encontrados exitosamente"},
        404: {"description": "No se encontraron clientes con ese email"}
    })
async def get_client_by_email(email: str):
    try:
        clients = client_controller.get_client_by_email(email)
        if not clients:
            raise HTTPException(status_code=404, detail=f"No se encontraron clientes con el email {email}")
        return clients
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/all',
    response_model=List[Client],
    responses={
        200: {"description": "Lista de clientes obtenida exitosamente"},
        400: {"description": "Error al obtener los clientes"}
    })
async def get_all_clients():
    try:
        return client_controller.get_all_clients()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put('/update/{client_id}',
    response_model=dict,
    responses={
        200: {"description": "Cliente actualizado exitosamente", "content": {"application/json": {"example": {"message": "Cliente actualizado correctamente"}}}},
        404: {"description": "Cliente no encontrado"},
        400: {"description": "Error en los datos proporcionados"}
    })
async def update_client(client_id: int, client: ClientToCreate):
    try:
        return client_controller.update_client(client_id, client)
    except Exception as e:
        if "No se encontró el cliente" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))

@router.delete('/delete/{client_id}',
    response_model=dict,
    responses={
        200: {"description": "Cliente eliminado exitosamente", "content": {"application/json": {"example": {"message": "Cliente eliminado correctamente"}}}},
        404: {"description": "Cliente no encontrado"}
    })
async def delete_client(client_id: int):
    try:
        return client_controller.delete_client(client_id)
    except Exception as e:
        if "No se encontró el cliente" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e)) 
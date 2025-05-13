from fastapi import APIRouter, HTTPException, status
from backend.edensg_server.domain.entities.team import Team, TeamToCreate
from backend.edensg_server.use_cases.team_use_cases import TeamController
from typing import List

router = APIRouter(prefix='/team')

team_controller = TeamController()

@router.post('/create', 
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {"description": "Equipo creado exitosamente", "content": {"application/json": {"example": {"message": "Equipo creado correctamente", "team_id": 1}}}},
        400: {"description": "Error en los datos proporcionados"}
    })
async def create_team(team: TeamToCreate):
    try:
        return team_controller.create_team(team)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get('/id/{team_id}',
    response_model=Team,
    responses={
        200: {"description": "Equipo encontrado"},
        404: {"description": "Equipo no encontrado"}
    })
async def get_team_by_id(team_id: int):
    try:
        return team_controller.get_team_by_id(team_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Equipo no encontrado: {str(e)}")

@router.get('/name/{team_name}',
    response_model=List[Team],
    responses={
        200: {"description": "Equipos encontrados exitosamente"},
        404: {"description": "No se encontraron equipos con ese nombre"}
    })
async def get_team_by_name(team_name: str):
    try:
        return team_controller.get_team_by_name(team_name)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"{str(e)}")

@router.put('/update_name/{team_id}',
    response_model=dict,
    responses={
        200: {"description": "Nombre del equipo actualizado exitosamente", "content": {"application/json": {"example": {"message": "Nombre del equipo actualizado correctamente"}}}},
        404: {"description": "Equipo no encontrado"}
    })
async def update_team_name(team_id: int, new_name: str):
    try:
        return team_controller.update_team_name(team_id, new_name)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Equipo no encontrado: {str(e)}")

@router.put('/update_leader/{team_id}',
    response_model=dict,
    responses={
        200: {"description": "Líder del equipo actualizado exitosamente", "content": {"application/json": {"example": {"message": "Líder del equipo actualizado correctamente"}}}},
        404: {"description": "Equipo no encontrado"}
    })
async def update_team_leader(team_id: int, new_leader_id: int):
    try:
        return team_controller.update_team_leader(team_id, new_leader_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Equipo no encontrado: {str(e)}")

@router.delete('/delete/{team_id}',
    response_model=dict,
    responses={
        200: {"description": "Equipo eliminado exitosamente", "content": {"application/json": {"example": {"message": "Equipo eliminado correctamente"}}}},
        404: {"description": "Equipo no encontrado"}
    })
async def delete_team(team_id: int):
    try:
        return team_controller.delete_team(team_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Equipo no encontrado: {str(e)}")

@router.get('/all',
    response_model=List[Team],
    responses={
        200: {"description": "Lista de equipos obtenida exitosamente"},
        400: {"description": "Error al obtener los equipos"}
    })
async def get_all_teams():
    try:
        return team_controller.get_all_teams()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/register_employees/{team_id}',
    response_model=dict,
    responses={
        200: {"description": "Empleados registrados exitosamente", "content": {"application/json": {"example": {"message": "Empleados registrados correctamente"}}}},
        400: {"description": "Error al registrar empleados"},
        404: {"description": "Equipo no encontrado"}
    })
async def register_team_employees(team_id: int, employee_ids: list[int]):
    try:
        return team_controller.register_team_employees(team_id, employee_ids)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/unregister_employees/{team_id}',
    response_model=dict,
    responses={
        200: {"description": "Empleados desregistrados exitosamente", "content": {"application/json": {"example": {"message": "Empleados desregistrados correctamente"}}}},
        400: {"description": "Error al desregistrar empleados"},
        404: {"description": "Equipo no encontrado"}
    })
async def unregister_team_employees(team_id: int, employee_ids: list[int]):
    try:
        return team_controller.unregister_team_employees(team_id, employee_ids)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))






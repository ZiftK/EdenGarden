from fastapi import APIRouter, HTTPException
from typing import List
from backend.edensg_server.use_cases.team_use_cases import TeamController
from pydantic import BaseModel

router = APIRouter(prefix="/team", tags=["teams"])
team_controller = TeamController()

class TeamMembersUpdate(BaseModel):
    empleados_ids: List[int]

class TeamNameUpdate(BaseModel):
    nombre: str

class TeamLeaderUpdate(BaseModel):
    lider_id: int

@router.put("/update_name/{team_id}")
async def update_team_name(team_id: int, data: TeamNameUpdate):
    """
    Actualiza el nombre de un equipo.
    """
    try:
        result = team_controller.update_team_name(team_id, data.nombre)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update_leader/{team_id}")
async def update_team_leader(team_id: int, data: TeamLeaderUpdate):
    """
    Actualiza el líder de un equipo.
    """
    try:
        result = team_controller.update_team_leader(team_id, data.lider_id)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update_members/{team_id}")
async def update_team_members(team_id: int, data: TeamMembersUpdate):
    """
    Actualiza los miembros de un equipo.
    """
    try:
        result = team_controller.register_team_employees(team_id, data.empleados_ids)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 
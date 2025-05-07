from fastapi import APIRouter
from backend.edensg_server.domain.entities.team import Team
from backend.edensg_server.use_cases.team_use_cases import TeamUseCases
from backend.edensg_server.adapters.repository.supb.team_repository_sb import TeamRepositorySB

router = APIRouter(prefix='/team')
team_use_cases = TeamUseCases(TeamRepositorySB())

@router.post('/create')
async def create_team(team: Team):
    return await team_use_cases.create_team(team)

@router.get('/id/{team_id}')
async def get_team_by_id(team_id: int):
    return await team_use_cases.get_team_by_id(team_id)

@router.get('/name/{team_name}')
async def get_team_by_name(team_name: str):
    return await team_use_cases.get_team_by_name(team_name)

@router.put('/update/{team_id}')
async def update_team(team_id: int, team: Team):
    print(team.model_dump())
    return await team_use_cases.update_team(team_id, team)

@router.delete('/delete/{team_id}')
async def delete_team(team_id: int):
    return await team_use_cases.delete_team(team_id)

@router.get('/all')
async def get_all_teams():
    return await team_use_cases.get_all_teams()







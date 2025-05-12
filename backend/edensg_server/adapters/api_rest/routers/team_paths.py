from fastapi import APIRouter
from backend.edensg_server.domain.entities.team import Team
from backend.edensg_server.adapters.repository.supb.team_repository_sb import TeamRepositorySB

router = APIRouter(prefix='/team')
team_repository = TeamRepositorySB()

@router.post('/create')
async def create_team(team: Team):
    return team_repository.create_team(team)

@router.get('/id/{team_id}')
async def get_team_by_id(team_id: int):
    return team_repository.find_team_by_id(team_id)

@router.get('/name/{team_name}')
async def get_team_by_name(team_name: str):
    return team_repository.find_team_by_name(team_name)

@router.put('/update/{team_id}')
async def update_team(team_id: int, team: Team):
    print(team.model_dump())
    return team_repository.update_team_data(team_id, team)

@router.delete('/delete/{team_id}')
async def delete_team(team_id: int):
    return team_repository.delete_team_data(team_id)

@router.get('/all')
async def get_all_teams():
    return team_repository.get_all_teams()







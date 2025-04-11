from fastapi import APIRouter
from backend.edensg_server.domain.entities.project import Project

projects_router = APIRouter(prefix='/project')

@projects_router.post('/create')
async def create_project(project: Project)-> None:
    pass

@projects_router.put('/update/:id')
async def update_project(project: Project)-> None:
    pass
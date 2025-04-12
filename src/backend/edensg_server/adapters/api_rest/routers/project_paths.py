from fastapi import APIRouter
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository

projects_router = APIRouter(prefix='/project')

project_repository: ProjectRepository = ProjectRepository()

@projects_router.post('/create')
async def create_project(project: Project)-> None:
    project_id = project_repository.create_project(project)
    return project_id

@projects_router.put('/update/{id}')
async def update_project(id: int, project: Project)-> None:
    project_repository.update_project_data(project)

@projects_router.get('/get/{id}')
async def get_project(id: int)-> Project:
    return project_repository.find_projects(id)

@projects_router.delete('/delete/{id}')
async def delete_project(id: int)-> None:
    project_repository.drop_project_data(id)
    return {"message": "Project deleted successfully"}

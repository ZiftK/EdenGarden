from fastapi import APIRouter, HTTPException, status
from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar, 
    ProjectCalendarToCreate,
    Sprint
)
from backend.edensg_server.use_cases.project_use_cases import ProjectController

project_controller = ProjectController()

router = APIRouter(prefix='/project')

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(project: ProjectToCreate):
    try:
        result = project_controller.create_project(project)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/all", status_code=status.HTTP_200_OK)
async def get_all_projects():
    try:
        result = project_controller.get_all_projects()
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/{project_id}", status_code=status.HTTP_200_OK)
async def get_project(project_id: int):
    try:
        result = project_controller.get_project(project_id)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{project_id}/calendar/create", status_code=status.HTTP_201_CREATED)
async def create_project_calendar(project_id: int, calendar: ProjectCalendarToCreate):
    try:
        result = project_controller.create_project_calendar(project_id, calendar)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/{project_id}/sprint/create", status_code=status.HTTP_201_CREATED)
async def create_project_sprint(project_id: int, sprint: Sprint):
    try:
        result = project_controller.create_project_sprint(project_id, sprint)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

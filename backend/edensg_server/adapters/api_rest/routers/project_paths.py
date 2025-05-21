from typing import Optional
from fastapi import APIRouter, HTTPException, status
from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar, 
    ProjectCalendarToCreate,
    Sprint
)
from backend.edensg_server.use_cases.project_use_cases import ProjectController
from pydantic import BaseModel

router = APIRouter(prefix='/project', tags=["project"])
project_controller = ProjectController()

class ImageUpdateRequest(BaseModel):
    image_url: Optional[str] = None
    base64_image: Optional[str] = None

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
        
@router.post("/{project_id}/image", status_code=status.HTTP_200_OK)
async def update_project_image(project_id: int, request: ImageUpdateRequest):
    try:
        if request.image_url:
            public_url = await project_controller.update_project_image(project_id, request.image_url)
        elif request.base64_image:
            public_url = await project_controller.update_project_image_base64(project_id, request.base64_image)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Se requiere image_url o base64_image"
            )
        return {"success": True, "image_url": public_url}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.delete("/{project_id}/image", status_code=status.HTTP_200_OK)
async def delete_project_image(project_id: int):
    try:
        success = await project_controller.delete_project_image(project_id)
        return {"success": success}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
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

@router.delete("/{project_id}/calendar", status_code=status.HTTP_200_OK)
async def delete_project_calendar(project_id: int):
    try:
        result = project_controller.delete_project_calendar(project_id)
        return result
    except Exception as e:
        if "No se encontró el proyecto" in str(e):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str(e)
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.delete("/{project_id}", status_code=status.HTTP_200_OK)
async def delete_project(project_id: int):
    try:
        result = await project_controller.delete_project(project_id)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

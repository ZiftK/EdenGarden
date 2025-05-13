from fastapi import APIRouter, HTTPException, status
from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, ProjectCalendarToCreate
from backend.edensg_server.use_cases.project_use_cases import ProjectController

project_controller = ProjectController()

router = APIRouter(prefix='/project')


@router.post('/create')
async def create_project(project: ProjectToCreate)-> None:
    project_id = project_controller.create_project(project)
    return project_id

@router.put('/update/{id}')
async def update_project(id: int, project: Project)-> None:
    project_controller.update_project(project)

@router.get('/get/{id}')
async def get_project(id: int)-> Project:
    return project_controller.get_project(id)

@router.delete('/delete/{id}')
async def delete_project(id: int)-> None:
    project_controller.delete_project(id)
    return {"message": "Project deleted successfully"}

@router.post('/calendar/create',
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {"description": "Calendario creado exitosamente", "content": {"application/json": {"example": {"message": "Calendario de proyecto creado correctamente", "calendar_id": 1}}}},
        400: {"description": "Error en los datos proporcionados"}
    })
async def create_project_calendar(project_calendar: ProjectCalendarToCreate)-> dict:
    try:
        return project_controller.create_project_calendar(project_calendar)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put('/calendar/update/{id}',
    response_model=dict,
    responses={
        200: {"description": "Calendario actualizado exitosamente", "content": {"application/json": {"example": {"message": "Calendario de proyecto actualizado correctamente"}}}},
        404: {"description": "Calendario no encontrado"},
        400: {"description": "Error en los datos proporcionados"}
    })
async def update_project_calendar(id: int, project_calendar: ProjectCalendarToCreate)-> dict:
    try:
        return project_controller.update_project_calendar(id, project_calendar)
    except Exception as e:
        if "No se encontró el calendario" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))

@router.delete('/calendar/delete/{id}',
    response_model=dict,
    responses={
        200: {"description": "Calendario eliminado exitosamente", "content": {"application/json": {"example": {"message": "Calendario de proyecto eliminado correctamente"}}}},
        404: {"description": "Calendario no encontrado"}
    })
async def delete_project_calendar(id: int)-> dict:
    try:
        return project_controller.delete_project_calendar(id)
    except Exception as e:
        if "No se encontró el calendario" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))



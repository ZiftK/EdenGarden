from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar,
    ProjectCalendarToCreate,
    Date,
    Sprint
)
from backend.edensg_server.adapters.repository.supb.project_repository_sb import ProjectRepositorySB
from backend.edensg_server.adapters.repository.supb.client_repository_sb import client_sb_repository
from backend.edensg_server.adapters.repository.supb.team_repository_sb import team_sb_repository
from backend.edensg_server.adapters.repository.supb.image_repository_sb import ImageRepositorySupabase

class ProjectController():
    def __init__(self):
        self.project_repository = ProjectRepositorySB()
        self.image_repository = ImageRepositorySupabase()
        
    def get_all_projects(self)-> list[Project]:
        self.project_repository.get_all_projects()

    def create_project(self, project: ProjectToCreate)-> dict:
        """
        Crea un nuevo proyecto con validaciones.
        """
    
        # Crear el proyecto
        project_id = self.project_repository.create_project(project)

        return {
            'message': 'Proyecto creado correctamente',
            'project_id': project_id
        }

    async def update_project_image(self, project_id: int, image_url: str) -> str:
        """Actualiza la imagen de un proyecto desde una URL."""
        try:
            # Subir la imagen a Supabase Storage
            public_url = await self.image_repository.update_entity_image(project_id, image_url, is_project=True)
            
            # Actualizar la URL de la imagen en la base de datos
            self.project_repository.update_project_image(project_id, public_url)
            
            return public_url
        except Exception as e:
            raise Exception(f"Error al actualizar la imagen del proyecto: {str(e)}")

    async def update_project_image_base64(self, project_id: int, base64_image: str) -> str:
        """Actualiza la imagen de un proyecto desde una imagen en base64."""
        try:
            # Subir la imagen a Supabase Storage
            public_url = await self.image_repository.upload_base64_image(base64_image, project_id, is_project=True)
            
            # Actualizar la URL de la imagen en la base de datos
            self.project_repository.update_project_image(project_id, public_url)
            
            return public_url
        except Exception as e:
            raise Exception(f"Error al actualizar la imagen del proyecto: {str(e)}")

    async def delete_project_image(self, project_id: int) -> bool:
        """Elimina la imagen de un proyecto."""
        try:
            # Buscar la imagen en el bucket
            files = self.image_repository.client.storage.from_(self.image_repository.project_bucket).list()
            for file in files:
                if file['name'].startswith(f"project_{project_id}_"):
                    await self.image_repository.delete_image(file['name'], is_project=True)
            
            # Actualizar el proyecto para eliminar la URL de la imagen
            self.project_repository.update_project_image(project_id, None)
            
            return True
        except Exception as e:
            raise Exception(f"Error al eliminar la imagen del proyecto: {str(e)}")

    def create_project_calendar(self, project_id: int, project_calendar: ProjectCalendarToCreate)-> dict:
        """
        Crea un nuevo calendario de proyecto con validaciones.
        """
        
        # Validar que la fecha de inicio no sea posterior a la fecha de fin
        initial_date = date(project_calendar.fecha_inicio.anno, project_calendar.fecha_inicio.mes.value, project_calendar.fecha_inicio.dia)
        final_date = date(project_calendar.fecha_fin.anno, project_calendar.fecha_fin.mes.value, project_calendar.fecha_fin.dia)
        if initial_date > final_date:
            raise Exception("La fecha de inicio no puede ser posterior a la fecha de fin")

        # Validar que las fechas sean válidas
        if not self._validate_date(project_calendar.fecha_inicio) or not self._validate_date(project_calendar.fecha_fin):
            raise Exception("Las fechas proporcionadas no son válidas")

        calendar_id = self.project_repository.create_project_calendar(project_id, project_calendar)
        return {
            'message': 'Calendario de proyecto creado correctamente',
            'calendar_id': calendar_id
        }

    def create_project_sprint(self, project_id: int, sprint: Sprint)-> dict:
        """
        Crea un nuevo sprint de proyecto con validaciones.
        """
        # Verificar que el proyecto existe
        project = self.project_repository.find_project(project_id)
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")

        # Validar que la fecha inicial no sea posterior a la fecha final
        initial_date = date(sprint.fecha_inicial.anno, sprint.fecha_inicial.mes.value, sprint.fecha_inicial.dia)
        final_date = date(sprint.fecha_final.anno, sprint.fecha_final.mes.value, sprint.fecha_final.dia)
        if initial_date > final_date:
            raise Exception("La fecha inicial del sprint no puede ser posterior a la fecha final")

        # Validar que las fechas sean válidas
        if not self._validate_date(sprint.fecha_inicial) or not self._validate_date(sprint.fecha_final):
            raise Exception("Las fechas del sprint proporcionadas no son válidas")

        # Validar que el nombre del sprint no esté vacío
        if not sprint.nombre or sprint.nombre.strip() == "":
            raise Exception("El nombre del sprint no puede estar vacío")

        sprint_id = self.project_repository.create_sprint(project_id, sprint)
        return {
            'message': 'Sprint creado correctamente',
            'sprint_id': sprint_id
        }
    

    def get_project(self, project_id: int)-> dict:
        """
        Obtiene un proyecto por su ID.
        """
        project = self.project_repository.find_project(project_id)
        return {"proyecto": project}

    def get_all_projects(self) -> dict:
        """
        Obtiene todos los proyectos registrados.
        """
        projects = self.project_repository.find_all_projects()
        return {"proyectos": projects}
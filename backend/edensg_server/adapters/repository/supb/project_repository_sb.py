from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar,
    ProjectCalendarToCreate,
    ScheduleTemplates,
    DaySchedule,
    DateTemplate,
    DayTemplate,
    ScheduleTemplate,
    SprintDates
)
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.adapters.repository.supb.formatter_to_db import format_project_calendar, format_sprint

class ProjectRepositorySB():
    def __init__(self):
        self.client = supabase_client
        self.table = 'proyecto'
        self.project_calendar_table = 'calendario_proyecto'
        self.project_sprint_table = 'sprint'

    def create_project(self, project: ProjectToCreate)-> int:
        '''
        Creates a new project in the database.
        '''
        # Verificar que el cliente existe
        client_response = self.client.table('cliente').select('*').eq('id_cliente', project.cliente).execute()
        if not client_response.data:
            raise Exception(f"No se encontró el cliente con ID {project.cliente}")

        # Verificar que el equipo existe si se proporciona
        if project.equipo:
            team_response = self.client.table('equipo').select('*').eq('id_equipo', project.equipo).execute()
            if not team_response.data:
                raise Exception(f"No se encontró el equipo con ID {project.equipo}")

        # Crear el proyecto
        result = self.client.table(self.table).insert({
            'nombre': project.nombre,
            'descripcion': project.descripcion,
            'estado': project.estado,
            'costo': project.costo,
            'fk_cliente': project.cliente,
            'fk_equipo': project.equipo
        }).execute()

        # Obtener el ID del proyecto creado
        project_id = result.data[0]['id_proyecto']

        return project_id
   

    def create_project_calendar(self, project_id: int, project_calendar: ProjectCalendarToCreate)-> int:
        '''
        Creates a new project calendar in the database.
        '''
        # Verificar que el proyecto existe
        project = self.client.table(self.table).select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")
            
        # Formatear el calendario para la base de datos
        formatted_calendar = format_project_calendar(project_calendar)
        
        # Crear el calendario
        result = self.client.table(self.project_calendar_table).insert(formatted_calendar).execute()
        
        # Obtener el ID del calendario creado
        calendar_id = result.data[0]['id_calendario']
        
        # Asociar el calendario con el proyecto
        self.client.table(self.table).update({'fk_calendario': calendar_id}).eq('id_proyecto', project_id).execute()
        
        return calendar_id
    
    def create_sprint(self, project_id: int, sprint: SprintDates)-> int:
        # Verificar que el proyecto existe
        project = self.client.table(self.table).select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")
        
        # Verificar que el proyecto tiene un calendario
        if not project[0]['fk_calendario']:
            raise Exception(f"El proyecto con ID {project_id} no tiene un calendario asociado")
        
        # Obtener el calendario del proyecto
        calendar = self.client.table(self.project_calendar_table).select('*').eq('id_calendario', project[0]['fk_calendario']).execute().data[0]
        
        # Convertir fechas del sprint a formato comparable
        sprint_inicio = str(sprint.fecha_inicial)
        sprint_fin = str(sprint.fecha_final)
        
        # Verificar que las fechas del sprint estén dentro de los límites del calendario
        if sprint_inicio < calendar['fecha_inicio'] or sprint_fin > calendar['fecha_fin']:
            raise Exception("Las fechas del sprint deben estar dentro del rango del calendario del proyecto")

        # Formatear el sprint para la base de datos
        formatted_sprint = format_sprint(sprint)

        # Crear el sprint
        result = self.client.table(self.project_sprint_table).insert(formatted_sprint).execute()

        # Asociar el sprint con el calendario
        self.client.table(self.project_calendar_table).update({'fk_sprint': result.data[0]['id_sprint']}).eq('id_calendario', project[0]['fk_calendario']).execute()

        # Retornar el ID del sprint creado
        return result.data[0]['id_sprint']

    def find_project(self, project_id: int)-> dict:
        '''
        Finds a project by its ID.
        '''
        return self.client.table(self.table).select('*').eq('id_proyecto', project_id).execute().data


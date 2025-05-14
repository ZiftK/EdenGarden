from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar,
    ProjectCalendarToCreate,
    Date,
    SprintDates
)
from backend.edensg_server.adapters.repository.supb.project_repository_sb import ProjectRepositorySB
from datetime import date
from backend.edensg_server.adapters.repository.supb.client_repository_sb import client_sb_repository
from backend.edensg_server.adapters.repository.supb.team_repository_sb import team_sb_repository

class ProjectController():
    def __init__(self):
        self.project_repository = ProjectRepositorySB()

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

    def create_project_sprint(self, project_id: int, sprint: SprintDates)-> dict:
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
    

    def update_project_calendar(self, project_calendar_id: int, project_calendar: ProjectCalendarToCreate)-> dict:
        """
        Actualiza un calendario de proyecto existente con validaciones.
        """
        
        # Verificar que el calendario existe
        existing_calendar = self.project_repository.get_project_calendar(project_calendar_id)
        if not existing_calendar:
            raise Exception(f"No se encontró el calendario para el proyecto con ID {project_calendar_id}")

        # Validar que la fecha de inicio no sea posterior a la fecha de fin
        initial_date = date(project_calendar.fecha_inicio.anno, project_calendar.fecha_inicio.mes.value, project_calendar.fecha_inicio.dia)
        final_date = date(project_calendar.fecha_fin.anno, project_calendar.fecha_fin.mes.value, project_calendar.fecha_fin.dia)
        if initial_date > final_date:
            raise Exception("La fecha de inicio no puede ser posterior a la fecha de fin")

        # Validar que las fechas sean válidas
        if not self._validate_date(project_calendar.fecha_inicio) or not self._validate_date(project_calendar.fecha_fin):
            raise Exception("Las fechas proporcionadas no son válidas")

        self.project_repository.update_project_calendar(project_calendar_id, project_calendar)
        return {"message": "Calendario de proyecto actualizado correctamente"}

    def delete_project_calendar(self, project_calendar_id: int)-> dict:
        """
        Elimina un calendario de proyecto con validaciones.
        """

        # Verificar que el calendario existe
        existing_calendar = self.project_repository.get_project_calendar(project_calendar_id)
        if not existing_calendar:
            raise Exception(f"No se encontró el calendario para el proyecto con ID {project_calendar_id}")

        self.project_repository.delete_project_calendar(project_calendar_id)
        return {"message": "Calendario de proyecto eliminado correctamente"}

    def _validate_date(self, date: Date) -> bool:
        """
        Valida que una fecha sea válida.
        """
        try:
            # Validar que el día esté dentro del rango válido para el mes
            days_in_month = {
                1: 31, 2: 29 if date.anno % 4 == 0 and (date.anno % 100 != 0 or date.anno % 400 == 0) else 28,
                3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
            }
            
            if date.dia < 1 or date.dia > days_in_month[date.mes.value]:
                return False
            
            # Validar que el año sea razonable (por ejemplo, entre 2000 y 2100)
            if date.anno < 2000 or date.anno > 2100:
                return False
                
            return True
        except Exception:
            return False


    def update_project_sprint(self, sprint_id: int, sprint: SprintDates)-> dict:
        """
        Actualiza un sprint de proyecto existente con validaciones.
        """
        # Verificar que el sprint existe
        existing_sprint = self.project_repository.get_project_sprint(sprint_id)
        if not existing_sprint:
            raise Exception(f"No se encontró el sprint con ID {sprint_id}")

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

        self.project_repository.update_project_sprint(sprint_id, sprint)
        return {"message": "Sprint actualizado correctamente"}

    def delete_project_sprint(self, sprint_id: int)-> dict:
        """
        Elimina un sprint de proyecto con validaciones.
        """
        # Verificar que el sprint existe
        existing_sprint = self.project_repository.get_project_sprint(sprint_id)
        if not existing_sprint:
            raise Exception(f"No se encontró el sprint con ID {sprint_id}")

        self.project_repository.delete_project_sprint(sprint_id)
        return {"message": "Sprint eliminado correctamente"}


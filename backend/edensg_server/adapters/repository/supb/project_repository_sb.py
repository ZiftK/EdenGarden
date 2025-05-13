from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar,
    ProjectCalendarToCreate,
    ScheduleTemplates,
    DaySchedule,
    DateTemplate,
    DayTemplate,
    ScheduleTemplate,
)
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.adapters.repository.supb.formatter_to_db import format_project_calendar

class ProjectRepositorySB():
    def __init__(self):
        self.client = supabase_client
        self.table = 'proyecto'
        self.project_calendar_table = 'calendario_proyecto'
        self.project_sprint_table = 'sprint'


    def create_project_calendar(self, project_calendar: ProjectCalendarToCreate)-> int:
        '''
        Creates a new project calendar in the database.
        '''
        formatted_project_calendar = format_project_calendar(project_calendar)
        return self.client.table(self.project_calendar_table).insert(formatted_project_calendar).execute()
    
    def get_project_calendar(self, project_calendar_id: int)-> ProjectCalendar:
        '''
        Gets a project calendar from the database.
        '''
        return self.client.table(self.project_calendar_table).select('*').eq('id_calendario', project_calendar_id).execute().data

    def delete_project_calendar(self, project_id: int)-> None:
        '''
        Deletes a project calendar from the database.
        '''
        self.client.table(self.project_calendar_table).delete().eq('id_calendario', project_id).execute()

    def update_project_calendar(self, project_calendar_id: int, project_calendar: ProjectCalendar)-> None:
        '''
        Updates a project calendar in the database.
        '''
        formatted_project_calendar = format_project_calendar(project_calendar)
        self.client.table(self.project_calendar_table).update(formatted_project_calendar).eq('id_calendario', project_calendar_id).execute()



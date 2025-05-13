from backend.edensg_server.domain.entities.project_calendar import ProjectCalendarToCreate

def format_project_calendar(project_calendar: ProjectCalendarToCreate)-> dict:
    return {
        'fecha_inicio': str(project_calendar.fecha_inicio),
        'fecha_fin': str(project_calendar.fecha_fin),
    }


from backend.edensg_server.domain.entities.project_calendar import ProjectCalendarToCreate, Sprint

def format_project_calendar(project_calendar: ProjectCalendarToCreate)-> dict:
    return {
        'fecha_inicio': str(project_calendar.fecha_inicio),
        'fecha_fin': str(project_calendar.fecha_fin),
    }

def format_sprint(sprint: Sprint)-> dict:
    return {
        'nombre': sprint.nombre,
        'fecha_inicial': str(sprint.fecha_inicial),
        'fecha_final': str(sprint.fecha_final),
        'hora_inicial': str(sprint.hora_inicial),
        'hora_final': str(sprint.hora_final),
        'locacion': sprint.locacion
    }
    

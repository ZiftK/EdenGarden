from backend.edensg_server.domain.entities.project_calendar import ProjectCalendarToCreate, Sprint

def format_project_calendar(project_calendar: ProjectCalendarToCreate)-> dict:
    """
    Formatea un calendario de proyecto para la base de datos.
    Las fechas se formatean como YYYY-MM-DD
    """
    return {
        'fecha_inicio': f"{project_calendar.fecha_inicio.anno}-{project_calendar.fecha_inicio.mes.value:02d}-{project_calendar.fecha_inicio.dia:02d}",
        'fecha_fin': f"{project_calendar.fecha_fin.anno}-{project_calendar.fecha_fin.mes.value:02d}-{project_calendar.fecha_fin.dia:02d}",
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
    

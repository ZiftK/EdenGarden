from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.domain.entities.team import Team
from backend.edensg_server.domain.entities.project_calendar import Date
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.time_enums import EnumMonths


def format_employee(employee: dict) -> Employee:
    try:
        # Asegurarnos de que los campos opcionales existan
        employee.setdefault('email', None)
        employee.setdefault('img', None)
        employee.setdefault('fecha_salida', None)
        employee.setdefault('fecha_recontratacion', None)
        employee.setdefault('fk_equipo', None)

        # Formatear fecha de contratación
        if employee.get('fecha_contratacion'):
            in_date = employee['fecha_contratacion'].split('-')
            employee['fecha_contratacion'] = Date(
                dia=int(in_date[2]),
                mes=EnumMonths(int(in_date[1])),
                anno=int(in_date[0])
            )
        
        # Formatear fecha de salida si existe
        if employee.get('fecha_salida'):
            out_date = employee['fecha_salida'].split('-')
            employee['fecha_salida'] = Date(
                dia=int(out_date[2]),
                mes=EnumMonths(int(out_date[1])),
                anno=int(out_date[0])
            )
        
        # Formatear fecha de recontratación si existe
        if employee.get('fecha_recontratacion'):
            rehire_date = employee['fecha_recontratacion'].split('-')
            employee['fecha_recontratacion'] = Date(
                dia=int(rehire_date[2]),
                mes=EnumMonths(int(rehire_date[1])),
                anno=int(rehire_date[0])
            )
        
        print(f"Formateando empleado: {employee}")  # Debug log
        return Employee(**employee)
    except Exception as e:
        print(f"Error al formatear empleado: {str(e)}")  # Debug log
        raise Exception(f"Error al formatear empleado: {str(e)}")

def format_team(team: dict) -> Team:
    
    return Team(**{**team})    

def format_project(project: dict) -> Project:
    client_id = project.get('fk_cliente')
    return Project(**project)

from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.domain.entities.team import Team
from backend.edensg_server.domain.entities.project_calendar import Date
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.domain.entities.time_enums import EnumMonths


def format_employee(employee: dict) -> Employee:
    in_date = employee['fecha_contratacion'].split('-')
    employee['fecha_contratacion'] = Date(
        dia=int(in_date[2]),
        mes=EnumMonths(int(in_date[1])),
        anno=int(in_date[0])
    )
    if employee.get('fecha_salida'):
        out_date = employee['fecha_salida'].split('-')
        employee['fecha_salida'] = Date(
            dia=int(out_date[2]),
            mes=EnumMonths(int(out_date[1])),
            anno=int(out_date[0])
        )
    if employee.get('fecha_recontratacion'):
        rehire_date = employee['fecha_recontratacion'].split('-')
        employee['fecha_recontratacion'] = Date(
            dia=int(rehire_date[2]),
            mes=EnumMonths(int(rehire_date[1])),
            anno=int(rehire_date[0])
        )
    
    return Employee(**employee)

def format_team(team: dict) -> Team:
    
    return Team(**{**team})    

def format_project(project: dict) -> Project:
    client_id = project.get('fk_cliente')
    return Project(**project)

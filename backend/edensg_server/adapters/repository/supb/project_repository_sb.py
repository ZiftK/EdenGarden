from backend.edensg_server.domain.entities.project import Project, ProjectToCreate
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar,
    ProjectCalendarToCreate,
    Sprint,
    Date,
    Time,
    EnumMonths
)
from backend.edensg_server.domain.entities.client import Client
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.domain.entities.team import Team
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
        try:
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
            result = self.client.table('proyecto').insert({
                'nombre': project.nombre,
                'descripcion': project.descripcion,
                'estado': project.estado,
                'costo': project.costo,
                'fk_cliente': project.cliente,
                'fk_equipo': project.equipo,
                'img': project.img if project.img else None
            }).execute()

            if not result.data:
                raise Exception("Error al crear el proyecto: no se recibió respuesta del servidor")

            # Obtener el ID del proyecto creado
            project_id = result.data[0]['id_proyecto']
            if not project_id:
                raise Exception("Error al crear el proyecto: no se recibió el ID del proyecto")

            return project_id
        except Exception as e:
            print(f"Error al crear el proyecto: {str(e)}")
            raise e
    
    def update_project_image(self, project_id: int, image_url: str)-> None:
        '''
        Updates the image of a project in the database.
        '''
        # Verificar que el proyecto existe
        project = self.client.table('proyecto').select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")

        # Actualizar la imagen del proyecto
        self.client.table('proyecto').update({'img': image_url}).eq('id_proyecto', project_id).execute()


    def create_project_calendar(self, project_id: int, project_calendar: ProjectCalendarToCreate)-> int:
        '''
        Creates a new project calendar in the database.
        '''
        # Verificar que el proyecto existe
        project = self.client.table('proyecto').select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")
            
        # Formatear el calendario para la base de datos
        formatted_calendar = format_project_calendar(project_calendar)
        
        # Crear el calendario
        result = self.client.table('calendario_proyecto').insert(formatted_calendar).execute()
        
        # Obtener el ID del calendario creado
        calendar_id = result.data[0]['id_calendario']
        
        # Asociar el calendario con el proyecto
        self.client.table('proyecto').update({'fk_calendario': calendar_id}).eq('id_proyecto', project_id).execute()
        
        return calendar_id
    
    def create_sprint(self, project_id: int, sprint: Sprint)-> int:
        # Verificar que el proyecto existe
        project = self.client.table('proyecto').select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")
        
        # Verificar que el proyecto tiene un calendario
        if not project[0]['fk_calendario']:
            raise Exception(f"El proyecto con ID {project_id} no tiene un calendario asociado")
        
        # Obtener el calendario del proyecto
        calendar = self.client.table('calendario_proyecto').select('*').eq('id_calendario', project[0]['fk_calendario']).execute().data[0]
        
        # Convertir fechas del sprint a formato comparable
        sprint_inicio = str(sprint.fecha_inicial)
        sprint_fin = str(sprint.fecha_final)
        
        # Verificar que las fechas del sprint estén dentro de los límites del calendario
        if sprint_inicio < calendar['fecha_inicio'] or sprint_fin > calendar['fecha_fin']:
            raise Exception("Las fechas del sprint deben estar dentro del rango del calendario del proyecto")

        # Formatear el sprint para la base de datos
        formatted_sprint = format_sprint(sprint)

        # Crear el sprint
        result = self.client.table('sprint').insert(formatted_sprint).execute()

        # Asociar el sprint con el calendario
        self.client.table('calendario_proyecto').update({'fk_sprint': result.data[0]['id_sprint']}).eq('id_calendario', project[0]['fk_calendario']).execute()

        # Retornar el ID del sprint creado
        return result.data[0]['id_sprint']

    def _get_employee(self, employee_id: int, team_id: int) -> Employee:
        '''
        Obtiene un empleado completo.
        '''
        emp_data = self.client.table('empleado').select('*').eq('id_empleado', employee_id).execute().data[0]
        fecha_contratacion = emp_data['fecha_contratacion'].split('-')
        return Employee(
            id_empleado=emp_data['id_empleado'],
            nombre=emp_data['nombre'],
            email=emp_data['email'],
            telefono=emp_data['telefono'],
            direccion=emp_data['direccion'],
            fecha_contratacion=Date(
                dia=int(fecha_contratacion[2]),
                mes=EnumMonths(int(fecha_contratacion[1])),
                anno=int(fecha_contratacion[0])
            ),
            clave=emp_data['clave'],
            rol=emp_data['rol'],
            puesto=emp_data['puesto'],
            salario=emp_data['salario'],
            equipo=team_id
        )

    def _get_sprint(self, sprint_id: int) -> Sprint:
        '''
        Obtiene un sprint completo.
        '''
        sprint_data = self.client.table('sprint').select('*').eq('id_sprint', sprint_id).execute().data[0]
        return Sprint(
            id_sprint=sprint_data['id_sprint'],
            nombre=sprint_data['nombre'],
            fecha_inicial=Date(
                dia=int(sprint_data['fecha_inicial'].split('-')[2]), 
                mes=EnumMonths(int(sprint_data['fecha_inicial'].split('-')[1])),
                anno=int(sprint_data['fecha_inicial'].split('-')[0])
            ),
            fecha_final=Date(
                dia=int(sprint_data['fecha_final'].split('-')[2]),
                mes=EnumMonths(int(sprint_data['fecha_final'].split('-')[1])),
                anno=int(sprint_data['fecha_final'].split('-')[0])
            ),
            hora_inicial=Time(
                hora=int(sprint_data['hora_inicial'].split(':')[0]),
                minuto=int(sprint_data['hora_inicial'].split(':')[1]),
                segundo=int(sprint_data['hora_inicial'].split(':')[2])
            ),
            hora_final=Time(
                hora=int(sprint_data['hora_final'].split(':')[0]),
                minuto=int(sprint_data['hora_final'].split(':')[1]), 
                segundo=int(sprint_data['hora_final'].split(':')[2])
            ),
            locacion=sprint_data['locacion']
        )

    def _get_team(self, team_id: int) -> Team:
        '''
        Obtiene un equipo completo con su líder y empleados.
        '''
        team_data = self.client.table('equipo').select('*').eq('id_equipo', team_id).execute().data[0]
        
        # Obtener el líder del equipo
        leader = self._get_employee(team_data['fk_lider'], team_data['id_equipo'])
        
        # Obtener los empleados del equipo
        employees_data = self.client.table('empleado').select('*').eq('fk_equipo', team_data['id_equipo']).execute().data
        employees = [self._get_employee(emp['id_empleado'], team_data['id_equipo']) for emp in employees_data]
        
        return Team(
            id_equipo=team_data['id_equipo'],
            nombre=team_data['nombre'],
            lider=leader,
            empleados=employees
        )

    def find_project(self, project_id: int)-> Project:
        '''
        Finds a project by its ID.
        '''
        project = self.client.table('proyecto').select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")
        
        # Obtener el calendario del proyecto
        calendar = None
        if project[0]['fk_calendario']:
            calendar_data = self.client.table('calendario_proyecto').select('*').eq('id_calendario', project[0]['fk_calendario']).execute().data[0]
            
            # Obtener el sprint actual si existe
            sprint = None
            if calendar_data['fk_sprint']:
                sprint = self._get_sprint(calendar_data['fk_sprint'])
            
            calendar = ProjectCalendar(
                fecha_inicio=Date(
                    dia=int(calendar_data['fecha_inicio'].split('-')[2]),
                    mes=EnumMonths(int(calendar_data['fecha_inicio'].split('-')[1])),
                    anno=int(calendar_data['fecha_inicio'].split('-')[0])
                ),
                fecha_fin=Date(
                    dia=int(calendar_data['fecha_fin'].split('-')[2]),
                    mes=EnumMonths(int(calendar_data['fecha_fin'].split('-')[1])),
                    anno=int(calendar_data['fecha_fin'].split('-')[0])
                ),
                sprint_actual=sprint if sprint else None
            )

        # Obtener el cliente del proyecto
        client_data = self.client.table('cliente').select('*').eq('id_cliente', project[0]['fk_cliente']).execute().data[0]
        client = Client(
            id_cliente=client_data['id_cliente'],
            nombre=client_data['nombre'],
            direccion=client_data['direccion'],
            telefono=client_data['telefono'],
            email=client_data['email']
        )

        # Obtener el equipo del proyecto si existe
        team = None
        if project[0]['fk_equipo']:
            team = self._get_team(project[0]['fk_equipo'])

        # Formatear el proyecto completo
        formatted_project = Project(
            id_proyecto=project[0]['id_proyecto'],
            nombre=project[0]['nombre'],
            descripcion=project[0]['descripcion'],
            estado=project[0]['estado'],
            costo=project[0]['costo'],
            cliente=client,
            equipo=team,
            calendario=calendar,
            img=project[0]['img'] if 'img' in project[0] else None
        )
        
        return formatted_project

    def find_all_projects(self) -> list[Project]:
        """
        Encuentra todos los proyectos en la base de datos
        """
        try:
            # Obtener todos los proyectos
            projects = self.client.table('proyecto').select('*').execute().data

            # Lista para almacenar los proyectos formateados
            formatted_projects = []

            # Formatear cada proyecto
            for project in projects:
                try:
                    # Obtener el calendario si existe
                    calendar = None
                    if project['fk_calendario']:
                        calendar_data = self.client.table('calendario_proyecto').select('*').eq('id_calendario', project['fk_calendario']).execute().data[0]
                        
                        # Obtener el sprint actual si existe
                        sprint = None
                        if calendar_data['fk_sprint']:
                            sprint = self._get_sprint(calendar_data['fk_sprint'])
                        
                        calendar = ProjectCalendar(
                            fecha_inicio=Date(
                                dia=int(calendar_data['fecha_inicio'].split('-')[2]),
                                mes=EnumMonths(int(calendar_data['fecha_inicio'].split('-')[1])),
                                anno=int(calendar_data['fecha_inicio'].split('-')[0])
                            ),
                            fecha_fin=Date(
                                dia=int(calendar_data['fecha_fin'].split('-')[2]),
                                mes=EnumMonths(int(calendar_data['fecha_fin'].split('-')[1])),
                                anno=int(calendar_data['fecha_fin'].split('-')[0])
                            ),
                            sprint_actual=sprint if sprint else None
                        )

                    # Obtener el cliente del proyecto
                    client_data = self.client.table('cliente').select('*').eq('id_cliente', project['fk_cliente']).execute().data[0]
                    client = Client(
                        id_cliente=client_data['id_cliente'],
                        nombre=client_data['nombre'],
                        direccion=client_data['direccion'],
                        telefono=client_data['telefono'],
                        email=client_data['email']
                    )

                    # Obtener el equipo si existe
                    team = None
                    if project['fk_equipo']:
                        team = self._get_team(project['fk_equipo'])

                    # Crear el proyecto formateado
                    formatted_project = Project(
                        id_proyecto=project['id_proyecto'],
                        nombre=project['nombre'],
                        descripcion=project['descripcion'],
                        estado=project['estado'],
                        costo=project['costo'],
                        cliente=client,
                        equipo=team,
                        calendario=calendar,
                        img=project['img'] if 'img' in project else None
                    )
                    
                    formatted_projects.append(formatted_project)
                except Exception as e:
                    print(f"Error al formatear proyecto {project['id_proyecto']}: {str(e)}")
                    continue

            return formatted_projects
        except Exception as e:
            print(f"Error al obtener los proyectos: {str(e)}")
            raise e

    def delete_project_calendar(self, project_id: int) -> None:
        """
        Elimina el calendario de un proyecto.
        """
        try:
            # Obtener el ID del calendario del proyecto
            project = self.client.table('proyecto').select('fk_calendario').eq('id_proyecto', project_id).execute().data
            
            if not project:
                return  # No existe el proyecto
                
            if not project[0]['fk_calendario']:
                return  # No hay calendario que eliminar
                
            calendar_id = project[0]['fk_calendario']
            
            # Eliminar cualquier sprint asociado primero
            calendar = self.client.table('calendario_proyecto').select('fk_sprint').eq('id_calendario', calendar_id).execute().data
            if calendar and calendar[0]['fk_sprint']:
                self.client.table('sprint').delete().eq('id_sprint', calendar[0]['fk_sprint']).execute()
            
            # Actualizar el proyecto para quitar la referencia al calendario
            self.client.table('proyecto').update({'fk_calendario': None}).eq('id_proyecto', project_id).execute()
            
            # Eliminar el calendario
            self.client.table('calendario_proyecto').delete().eq('id_calendario', calendar_id).execute()
        except Exception as e:
            raise Exception(f"Error al eliminar el calendario: {str(e)}")

    def delete_project(self, project_id: int)-> None:
        '''
        Elimina un proyecto de la base de datos.
        '''
        # Verificar que el proyecto existe
        project = self.client.table('proyecto').select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")

        # Eliminar el proyecto
        self.client.table('proyecto').delete().eq('id_proyecto', project_id).execute()

    def update_project(self, project_id: int, project_data: dict) -> None:
        '''
        Updates a project in the database.
        '''
        # Verificar que el proyecto existe
        project = self.client.table('proyecto').select('*').eq('id_proyecto', project_id).execute().data
        if not project:
            raise Exception(f"No se encontró el proyecto con ID {project_id}")

        # Preparar los datos para actualizar
        update_data = {}
        if project_data.get('nombre') is not None:
            update_data['nombre'] = project_data['nombre']
        if project_data.get('descripcion') is not None:
            update_data['descripcion'] = project_data['descripcion']
        if project_data.get('estado') is not None:
            update_data['estado'] = project_data['estado']
        if project_data.get('costo') is not None:
            update_data['costo'] = project_data['costo']
        if project_data.get('cliente') is not None:
            update_data['fk_cliente'] = project_data['cliente']
        if project_data.get('equipo') is not None:
            update_data['fk_equipo'] = project_data['equipo']
        if project_data.get('img') is not None:
            update_data['img'] = project_data['img']

        # Actualizar el proyecto
        self.client.table('proyecto').update(update_data).eq('id_proyecto', project_id).execute()
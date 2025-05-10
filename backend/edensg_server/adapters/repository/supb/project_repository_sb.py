from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.project import Project
from backend.edensg_server.adapters.repository.interface.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.project_calendar import Date
from backend.edensg_server.domain.entities.project_calendar import EnumDays
from backend.edensg_server.domain.entities.project_calendar import ScheduleTemplate
from backend.edensg_server.domain.entities.project_calendar import DayTemplate
from backend.edensg_server.domain.entities.project_calendar import DateTemplate
from backend.edensg_server.domain.entities.project_calendar import ScheduleTemplates
from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar
from backend.edensg_server.domain.entities.project_calendar import Time
from backend.edensg_server.adapters.repository.supb.client_repository_sb import ClientRepositorySB
import json

class ProjectRepositorySB(ProjectRepository):
    def __init__(self):
        self.client = supabase_client
        self.table = 'proyecto'

    def create_project(self, data: Project) -> int:
        """Inserta un nuevo proyecto en la base de datos."""
        # Get client data
        client_repo = ClientRepositorySB()
        client = client_repo.find_client_by_id(data.cliente)
        if not client:
            raise ValueError(f"Client with ID {data.cliente} not found")

        # Prepare project data
        project_data = {
            'nombre': data.nombre,
            'descripcion': data.descripcion,
            'estado': data.estado,
            'costo': data.costo,
            'fk_cliente': client.id_cliente
        }

        # Create project
        response = self.client.table('proyecto').insert(project_data).execute()
        project_id = response.data[0]['id_proyecto']

        # Create calendar
        calendar_data = {
            'fecha_inicio': f"{data.calendario.fecha_inicio.anno}-{data.calendario.fecha_inicio.mes.value}-{data.calendario.fecha_inicio.dia}",
            'fecha_fin': f"{data.calendario.fecha_fin.anno}-{data.calendario.fecha_fin.mes.value}-{data.calendario.fecha_fin.dia}"
        }
        calendar_response = self.client.table('calendario_proyecto').insert(calendar_data).execute()
        calendar_id = calendar_response.data[0]['id_calendario']

        # Update project with calendar ID
        self.client.table('proyecto').update({'fk_calendario': calendar_id}).eq('id_proyecto', project_id).execute()

        # Create schedule templates
        for template in data.calendario.plantillas_horario.by_day + data.calendario.plantillas_horario.by_date:
            schedule_data = {
                'es_laborable': template.horario.es_laborable,
                'hora_inicial': f"{template.horario.hora_inicial.hora}:{template.horario.hora_inicial.minuto}:{template.horario.hora_inicial.segundo}",
                'hora_final': f"{template.horario.hora_final.hora}:{template.horario.hora_final.minuto}:{template.horario.hora_final.segundo}",
                'locacion': template.horario.locacion
            }
            schedule_response = self.client.table('plantilla_horario').insert(schedule_data).execute()
            schedule_id = schedule_response.data[0]['id_plantilla']

            # Link schedule to calendar
            self.client.table('calendario_proyecto_plantilla_horario').insert({
                'fk_calendario_proyecto': calendar_id,
                'fk_plantilla': schedule_id
            }).execute()

            # Create day/date templates
            if isinstance(template, DayTemplate):
                self.client.table('plantilla_horario_plantilla_dia').insert({
                    'fk_plantilla_horario': schedule_id,
                    'fk_plantilla_dia': template.dia.value + 1
                }).execute()
            elif isinstance(template, DateTemplate):
                # Create date template first
                date_template_response = self.client.table('plantilla_fecha').insert({
                    'fecha': f"{template.fecha.anno}-{template.fecha.mes.value}-{template.fecha.dia}"
                }).execute()
                date_template_id = date_template_response.data[0]['id_plantilla']

                # Then link it to the schedule
                self.client.table('plantilla_horario_plantilla_fecha').insert({
                    'fk_plantilla_horario': schedule_id,
                    'fk_plantilla_fecha': date_template_id
                }).execute()

        return project_id

    def find_project_by_id(self, id: int) -> list[Project]:
        """Busca proyectos por un campo específico."""

        response = supabase_client\
        .table('proyecto')\
        .select('''
            id_proyecto,
            nombre,
            descripcion,
            estado,
            costo,
            fk_cliente ( * ),
            calendario_proyecto (
                fecha_inicio,
                fecha_fin,
                sprint ( *),
                calendario_proyecto_plantilla_horario (
                    plantilla_horario (
                        *,
                        plantilla_horario_plantilla_dia (
                            plantilla_dia (
                                id_plantilla
                            )
                        ),
                        plantilla_horario_plantilla_fecha (
                            plantilla_fecha (
                                fecha
                                )
                            )
                        )
                    )
                )
            )
        ''')\
        .eq('id_proyecto', id)\
        .execute()

        response = response.data[0]
        calendar = response.get('calendario_proyecto')
        schedule_templates = calendar.get('calendario_proyecto_plantilla_horario')

        all_by_day_templates = []
        all_by_date_templates = []

        for template in schedule_templates:
            global_template = template.get('plantilla_horario')

            initial_time = global_template.pop('hora_inicial').split(':')
            initial_time = Time(hora=int(initial_time[0]), minuto=int(initial_time[1]), segundo=int(initial_time[2]))

            final_time = global_template.pop('hora_final').split(':')
            final_time = Time(hora=int(final_time[0]), minuto=int(final_time[1]), segundo=int(final_time[2]))

            by_day = global_template.pop('plantilla_horario_plantilla_dia')
            by_day = [day.get('plantilla_dia').get('id_plantilla') for day in by_day]
            by_day = [EnumDays(day-1) for day in by_day]

            by_date: list[dict] = global_template.pop('plantilla_horario_plantilla_fecha')
            by_date: list[list[str]] = [date.get('plantilla_fecha').get('fecha').split('-') for date in by_date]
            by_date: list[Date] = [Date(dia=int(date[2]), mes=int(date[1]), anno=int(date[0])) for date in by_date]

            global_schedule = ScheduleTemplate(
                    es_laborable=global_template.get('es_laborable'),
                    hora_inicial=initial_time,
                    hora_final=final_time,
                    locacion=global_template.get('locacion')
                )

            by_day = [DayTemplate(dia=day, horario=global_schedule) for day in by_day]
            by_date = [DateTemplate(fecha=date, horario=global_schedule) for date in by_date]

            all_by_day_templates.extend(by_day)
            all_by_date_templates.extend(by_date)

        schedule_templates = ScheduleTemplates(
            by_day=all_by_day_templates,
            by_date=all_by_date_templates,
            default=None
        )

        calendar_initial_date = calendar.get('fecha_inicio').split('-')
        calendar_final_date = calendar.get('fecha_fin').split('-')
        calendar = ProjectCalendar(
            fecha_inicio=Date(dia=int(calendar_initial_date[2]), mes=int(calendar_initial_date[1]), anno=int(calendar_initial_date[0])),
            fecha_fin=Date(dia=int(calendar_final_date[2]), mes=int(calendar_final_date[1]), anno=int(calendar_final_date[0])),
            plantillas_horario=schedule_templates
        )

        return Project(
            id_proyecto=response.get('id_proyecto'),
            nombre=response.get('nombre'),
            descripcion=response.get('descripcion'),
            estado=response.get('estado'),
            costo=response.get('costo'),
            cliente=response.get('fk_cliente').get('id_cliente'),
            calendario=calendar
        )

    def update_project_data(self, id: int, data: Project) -> None:
        """Actualiza la información de un proyecto."""
        # Get client data
        client_repo = ClientRepositorySB()
        client = client_repo.find_client_by_id(data.cliente)
        if not client:
            raise ValueError(f"Client with ID {data.cliente} not found")

        # Update project data
        project_data = {
            'nombre': data.nombre,
            'descripcion': data.descripcion,
            'estado': data.estado,
            'costo': data.costo,
            'fk_cliente': client.id_cliente
        }
        self.client.table('proyecto').update(project_data).eq('id_proyecto', id).execute()

        # Get current calendar ID
        project_response = self.client.table('proyecto').select('fk_calendario').eq('id_proyecto', id).execute()
        calendar_id = project_response.data[0]['fk_calendario']

        # Update calendar dates
        calendar_data = {
            'fecha_inicio': f"{data.calendario.fecha_inicio.anno}-{data.calendario.fecha_inicio.mes.value}-{data.calendario.fecha_inicio.dia}",
            'fecha_fin': f"{data.calendario.fecha_fin.anno}-{data.calendario.fecha_fin.mes.value}-{data.calendario.fecha_fin.dia}"
        }
        self.client.table('calendario_proyecto').update(calendar_data).eq('id_calendario', calendar_id).execute()

        # Delete existing schedule templates and their relationships
        self.client.table('calendario_proyecto_plantilla_horario').delete().eq('fk_calendario_proyecto', calendar_id).execute()

        # Create new schedule templates
        for template in data.calendario.plantillas_horario.by_day + data.calendario.plantillas_horario.by_date:
            schedule_data = {
                'es_laborable': template.horario.es_laborable,
                'hora_inicial': f"{template.horario.hora_inicial.hora}:{template.horario.hora_inicial.minuto}:{template.horario.hora_inicial.segundo}",
                'hora_final': f"{template.horario.hora_final.hora}:{template.horario.hora_final.minuto}:{template.horario.hora_final.segundo}",
                'locacion': template.horario.locacion
            }
            schedule_response = self.client.table('plantilla_horario').insert(schedule_data).execute()
            schedule_id = schedule_response.data[0]['id_plantilla']

            # Link schedule to calendar
            self.client.table('calendario_proyecto_plantilla_horario').insert({
                'fk_calendario_proyecto': calendar_id,
                'fk_plantilla': schedule_id
            }).execute()

            # Create day/date templates
            if isinstance(template, DayTemplate):
                self.client.table('plantilla_horario_plantilla_dia').insert({
                    'fk_plantilla_horario': schedule_id,
                    'fk_plantilla_dia': template.dia.value + 1
                }).execute()
            elif isinstance(template, DateTemplate):
                # Create date template first
                date_template_response = self.client.table('plantilla_fecha').insert({
                    'fecha': f"{template.fecha.anno}-{template.fecha.mes.value}-{template.fecha.dia}"
                }).execute()
                date_template_id = date_template_response.data[0]['id_plantilla']

                # Then link it to the schedule
                self.client.table('plantilla_horario_plantilla_fecha').insert({
                    'fk_plantilla_horario': schedule_id,
                    'fk_plantilla_fecha': date_template_id
                }).execute()

    def drop_project_data(self, id: int) -> None:
        """Elimina un proyecto de la base de datos."""
        # Get calendar ID first
        project_response = self.client.table('proyecto').select('fk_calendario').eq('id_proyecto', id).execute()
        calendar_id = project_response.data[0]['fk_calendario']

        # Delete project (this will cascade delete related records)
        self.client.table('proyecto').delete().eq('id_proyecto', id).execute()

    def find_all_projects(self, id: int = None) -> list[Project]:
        """Busca proyectos por un campo específico."""
        query = supabase_client\
        .table('proyecto')\
        .select('''
            id_proyecto,
            nombre,
            descripcion,
            estado,
            costo,
            fk_cliente ( * ),
            calendario_proyecto (
                fecha_inicio,
                fecha_fin,
                sprint ( *),
                calendario_proyecto_plantilla_horario (
                    plantilla_horario (
                        *,
                        plantilla_horario_plantilla_dia (
                            plantilla_dia (
                                id_plantilla
                            )
                        ),
                        plantilla_horario_plantilla_fecha (
                            plantilla_fecha (
                                fecha
                                )
                            )
                        )
                    )
                )
            )
        ''')

        if id is not None:
            query = query.eq('id_proyecto', id)

        response = query.execute()
        projects = []

        for project_data in response.data:
            calendar = project_data.get('calendario_proyecto')
            schedule_templates = calendar.get('calendario_proyecto_plantilla_horario')

            all_by_day_templates = []
            all_by_date_templates = []

            for template in schedule_templates:
                global_template = template.get('plantilla_horario')

                initial_time = global_template.pop('hora_inicial').split(':')
                initial_time = Time(hora=int(initial_time[0]), minuto=int(initial_time[1]), segundo=int(initial_time[2]))

                final_time = global_template.pop('hora_final').split(':')
                final_time = Time(hora=int(final_time[0]), minuto=int(final_time[1]), segundo=int(final_time[2]))

                by_day = global_template.pop('plantilla_horario_plantilla_dia')
                by_day = [day.get('plantilla_dia').get('id_plantilla') for day in by_day]
                by_day = [EnumDays(day-1) for day in by_day]

                by_date: list[dict] = global_template.pop('plantilla_horario_plantilla_fecha')
                by_date: list[list[str]] = [date.get('plantilla_fecha').get('fecha').split('-') for date in by_date]
                by_date: list[Date] = [Date(dia=int(date[2]), mes=int(date[1]), anno=int(date[0])) for date in by_date]

                global_schedule = ScheduleTemplate(
                        es_laborable=global_template.get('es_laborable'),
                        hora_inicial=initial_time,
                        hora_final=final_time,
                        locacion=global_template.get('locacion')
                    )

                by_day = [DayTemplate(dia=day, horario=global_schedule) for day in by_day]
                by_date = [DateTemplate(fecha=date, horario=global_schedule) for date in by_date]

                all_by_day_templates.extend(by_day)
                all_by_date_templates.extend(by_date)

            schedule_templates = ScheduleTemplates(
                by_day=all_by_day_templates,
                by_date=all_by_date_templates,
                default=None
            )

            calendar_initial_date = calendar.get('fecha_inicio').split('-')
            calendar_final_date = calendar.get('fecha_fin').split('-')
            calendar = ProjectCalendar(
                fecha_inicio=Date(dia=int(calendar_initial_date[2]), mes=int(calendar_initial_date[1]), anno=int(calendar_initial_date[0])),
                fecha_fin=Date(dia=int(calendar_final_date[2]), mes=int(calendar_final_date[1]), anno=int(calendar_final_date[0])),
                plantillas_horario=schedule_templates
            )

            project = Project(
                id_proyecto=project_data.get('id_proyecto'),
                nombre=project_data.get('nombre'),
                descripcion=project_data.get('descripcion'),
                estado=project_data.get('estado'),
                costo=project_data.get('costo'),
                cliente=project_data.get('fk_cliente').get('id_cliente'),
                calendario=calendar
            )
            projects.append(project)

        return projects

def main():
    # Get all projects
    projects = ProjectRepositorySB().find_projects()
    print("All projects:")
    for project in projects:
        print(f"\nProject ID: {project.id_proyecto}")
        print(f"Name: {project.nombre}")
        print(f"Status: {project.estado}")
        print(f"Cost: {project.costo}")
        print("Calendar:")
        print(f"  Start date: {project.calendario.fecha_inicio.dia}/{project.calendario.fecha_inicio.mes.value}/{project.calendario.fecha_inicio.anno}")
        print(f"  End date: {project.calendario.fecha_fin.dia}/{project.calendario.fecha_fin.mes.value}/{project.calendario.fecha_fin.anno}")
        print("  Schedule templates:")
        for template in project.calendario.plantillas_horario.by_day:
            print(f"    Day: {template.dia.name}")
            print(f"    Location: {template.horario.locacion}")
            print(f"    Hours: {template.horario.hora_inicial.hora}:{template.horario.hora_inicial.minuto} - {template.horario.hora_final.hora}:{template.horario.hora_final.minuto}")
        for template in project.calendario.plantillas_horario.by_date:
            print(f"    Date: {template.fecha.dia}/{template.fecha.mes.value}/{template.fecha.anno}")
            print(f"    Location: {template.horario.locacion}")
            print(f"    Hours: {template.horario.hora_inicial.hora}:{template.horario.hora_inicial.minuto} - {template.horario.hora_final.hora}:{template.horario.hora_final.minuto}")

if __name__ == "__main__":
    main()

project_sb_repository = ProjectRepositorySB()

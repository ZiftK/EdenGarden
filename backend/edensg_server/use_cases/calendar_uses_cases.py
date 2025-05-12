from datetime import date, timedelta
from typing import List, Set, Optional
from backend.edensg_server.domain.entities.project_calendar import (
    ProjectCalendar, Date, DateSchedule, DateTemplate, 
    DayTemplate, ScheduleTemplates, ScheduleData
) 
from backend.edensg_server.domain.entities.time_enums import EnumDays
from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository

class CalendarUseCases:
    def __init__(self, project_repository: ProjectRepository):
        self.project_repository = project_repository

    async def get_working_days(self, project_id: str) -> List[DateSchedule]:
        """
        Obtiene los días laborables en el sprint actual de un proyecto.
        
        Args:
            project_id: ID del proyecto
            
        Returns:
            List[DateSchedule]: Lista de días laborables con sus horarios
            
        Raises:
            ValueError: Si el proyecto no existe
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
            
        calendario = proyectos[0].calendar
        return self._get_working_days_on_sprint(calendario)

    async def add_non_working_day(
        self, 
        project_id: str, 
        date: Date, 
        is_working_day: bool = False
    ) -> None:
        """
        Agrega un día no laborable específico al calendario del proyecto.
        
        Args:
            project_id: ID del proyecto
            date: Fecha a marcar como no laborable
            is_working_day: Si es False, marca el día como no laborable
            
        Raises:
            ValueError: Si el proyecto no existe
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
            
        proyecto = proyectos[0]
        calendario = proyecto.calendar
        
        # Crear plantilla para la fecha específica
        date_template = DateTemplate(
            date=date,
            schedule=ScheduleData(is_working_day=is_working_day)
        )
        
        # Agregar a las plantillas existentes
        calendario.schedule_templates.by_date.append(date_template)
        
        # Actualizar el proyecto
        await self.project_repository.update_project_data(project_id, proyecto)

    async def add_non_working_weekday(
        self, 
        project_id: str, 
        weekday: EnumDays, 
        is_working_day: bool = False
    ) -> None:
        """
        Agrega un día de la semana como no laborable al calendario del proyecto.
        
        Args:
            project_id: ID del proyecto
            weekday: Día de la semana a marcar como no laborable
            is_working_day: Si es False, marca el día como no laborable
            
        Raises:
            ValueError: Si el proyecto no existe
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
            
        proyecto = proyectos[0]
        calendario = proyecto.calendar
        
        # Crear plantilla para el día de la semana
        day_template = DayTemplate(
            day=weekday,
            schedule=ScheduleData(is_working_day=is_working_day)
        )
        
        # Agregar a las plantillas existentes
        calendario.schedule_templates.by_day.append(day_template)
        
        # Actualizar el proyecto
        await self.project_repository.update_project_data(project_id, proyecto)

    async def set_default_schedule(
        self, 
        project_id: str, 
        default_schedule: ScheduleData
    ) -> None:
        """
        Establece el horario por defecto para el calendario del proyecto.
        
        Args:
            project_id: ID del proyecto
            default_schedule: Horario por defecto a establecer
            
        Raises:
            ValueError: Si el proyecto no existe
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
            
        proyecto = proyectos[0]
        proyecto.calendar.default_schedule = default_schedule
        
        await self.project_repository.update_project_data(project_id, proyecto)

    def _convert_to_operational_date(self, date_entity: Date) -> date:
        """
        Convierte un objeto de entidad tipo `Date` a un objeto de fecha operable tipo
        `datetime.date`.
        """
        return date(
            date_entity.year,
            date_entity.month.value, 
            date_entity.day
        )

    def _substract_not_working_days(self, schedule_templates: ScheduleTemplates) -> dict:
        """
        Procesa las plantillas de horario para separar días laborables y no laborables.
        """
        res = dict()

        day_templates: list[DayTemplate] = schedule_templates.by_day
        date_templates: list[DateTemplate] = schedule_templates.by_date

        if not date_templates:
            date_templates: list[DateTemplate] = []
        if not day_templates:
            day_templates: list[DayTemplate] = []
        
        day_templates = set(day_templates)
        date_templates = set(date_templates)

        not_working_days = set(x for x in day_templates if not x.schedule.is_working_day)
        not_working_dates = set(x for x in date_templates if not x.schedule.is_working_day)

        day_templates -= not_working_days
        date_templates -= not_working_dates

        not_working_days = set(EnumDays(x.day.value) for x in not_working_days)
        not_working_dates = set(self._convert_to_operational_date(x.date) for x in not_working_dates)

        res = {
            "day_templates": day_templates,
            "date_templates": date_templates,
            "not_working_days": not_working_days,
            "not_working_dates": not_working_dates
        }
        return res

    def _run_through_dates(
        self,
        initial_date: date,
        final_date: date, 
        difference: timedelta, 
        exclude_dates: Set[date] = None,
        exclude_days: Set[EnumDays] = None
    ) -> List[Date]:
        """
        Calcula todas las fechas en un rango, excluyendo fechas y días específicos.
        """
        auxiliar_date = initial_date
        between_dates: List[Date] = []

        while auxiliar_date <= final_date:
            new_date = Date(
                day=auxiliar_date.day,
                month=auxiliar_date.month,
                year=auxiliar_date.year
            )

            if exclude_dates and auxiliar_date in exclude_dates:
                exclude_dates.remove(auxiliar_date)
                auxiliar_date += difference
                continue

            if exclude_days and auxiliar_date.weekday() in exclude_days:
                auxiliar_date += difference
                continue
            
            between_dates.append(new_date)
            auxiliar_date += difference

        return between_dates

    def _apply_schedule_templates(
        self,
        working_days: List[Date], 
        day_templates: List[DayTemplate], 
        date_templates: List[DateTemplate],
        default_template: ScheduleData
    ) -> List[DateSchedule]:
        """
        Aplica las plantillas de horario a los días laborables.
        """
        schedules: List[DateSchedule] = []
        day_templates_as_ints = set(x.day.value for x in day_templates)
        
        for wd in working_days:
            schedule_template = default_template

            if wd in date_templates:
                schedule_template = date_templates[date_templates.index(wd)].schedule
            elif self._convert_to_operational_date(wd).weekday() in day_templates_as_ints:
                schedule_template = list(filter(
                    lambda x: x if x.day.value == self._convert_to_operational_date(wd).weekday() else None,
                    day_templates
                ))[0].schedule

            new_date_schedule = DateSchedule(
                date=wd,
                schedule=schedule_template
            )

            schedules.append(new_date_schedule)

        return schedules

    def _get_working_days_on_sprint(self, project_calendar: ProjectCalendar) -> List[DateSchedule]:
        """
        Obtiene los días laborables en un sprint de proyecto.
        """
        initial_date = self._convert_to_operational_date(project_calendar.current_sprint.initial_date)
        final_date = self._convert_to_operational_date(project_calendar.current_sprint.final_date)
        templates = project_calendar.schedule_templates

        templates_dict = self._substract_not_working_days(templates)
        day_templates = templates_dict["day_templates"]
        date_templates = templates_dict["date_templates"]
        n_working_days = templates_dict["not_working_days"]
        n_working_dates = templates_dict["not_working_dates"]

        working_days = self._run_through_dates(
            initial_date=initial_date,
            final_date=final_date,
            difference=timedelta(days=1),
            exclude_dates=n_working_dates,
            exclude_days=n_working_days
        )

        return self._apply_schedule_templates(
            working_days=working_days,
            day_templates=list(day_templates),
            date_templates=list(date_templates),
            default_template=project_calendar.default_schedule
        )
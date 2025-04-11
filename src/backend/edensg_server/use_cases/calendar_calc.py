from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, Date, DateSchedule, DateTemplate, DayTemplate, ScheduleTemplates, ScheduleData
from datetime import date, timedelta
from backend.edensg_server.domain.entities.time_enums import EnumDays

def convert_to_operational_date(date_entity: Date)-> date:
    """
    Convierte un objeto de entidad tipo `Date` a un objeto de fecha operable tipo
    `datetime.date`.

    :param date_entity: entidad de dominio para fecha
    :returns:
    objeto `datetime.date`.
    """

    return date(
            date_entity.year,
            date_entity.month.value, 
            date_entity.day
        )

def substract_not_working_days(schedule_templates: ScheduleTemplates)->dict:
    """

    :param schedule_templates: 
    Plantillas de horario 

    :returns:
    Retorna un diccionario con la siguiente estructura

    day_templates -> plantillas de día (laborables)
    date_templates -> plantillas de fecha (laborables)
    not_working_days -> días no laborables
    not_working_dates -> fechas no laborables
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
    not_working_dates = set(convert_to_operational_date(x.date) for x in not_working_dates)

    res = {
        "day_templates": day_templates,
        "date_templates": date_templates,
        "not_working_days": not_working_days,
        "not_working_dates": not_working_dates
    }
    return res

def run_through_dates(*, 
    initial_date: date,
    final_date: date, 
    difference: timedelta, 
    exclude_dates: set[date] = None,
    exclude_days: set[EnumDays] = None
    )-> list[Date]:
    """
    Calcula todas las fechas desde `initial_date` hasta `final_date` con un salto de `difference` excluyendo
    todas las fechas que esten en `exclude`.

    :param initial_date: fecha inicial de la iteracion
    :param final_date: fecha final de la iteracion
    :param difference: diferencia de iteracion
    :param exclude: fechas excluidas de la iteracion

    :returns: lista de fechas desde la fecha inicial a la final con un salto marcado
    por `difference` y excluyendo las fechas en `exclude`.
    """
    auxiliar_date = initial_date
    between_dates: list[Date] = []

    while auxiliar_date <= final_date:

        new_date = Date(**
            {
                "day": auxiliar_date.day,
                "month": auxiliar_date.month,
                "year": auxiliar_date.year
            }
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

def apply_schedule_templates(
        working_days: list[Date], 
        day_templates: list[DayTemplate], 
        date_templates: list[DateTemplate],
        default_template: ScheduleData)-> list[DateSchedule]:
    """
    
    :param working_days: lista de fechas laborables
    :param day_template: lista de plantillas de día
    :param date_templates: lista de plantillas de fecha
    :param default_template: plantilla por defecto

    :returns: 
    fechas laborables (`working_days`) con plantillas de días o fechas aplicadas

    Note
    -------
    Las plantillas se aplican en orden de prioridad, dando prioridad a las plantillas de
    fecha y en segundo lugar a las plantillas de día
    """

    # schedules to return
    schedules: list[DateSchedule] = []
    day_templates_as_ints = set(x.day.value for x in day_templates)
    
    # run throught working days
    for wd in working_days:
        
        # schedule template selection
        schedule_template = default_template

        if wd in date_templates:# if is a date template
            schedule_template = date_templates[date_templates.index(wd)]

        elif convert_to_operational_date(wd).weekday() in day_templates_as_ints:# if is a day template
            schedule_template = list(filter(
                lambda x: x if x.day.value == convert_to_operational_date(wd).weekday() else None,
                day_templates
                ))[0].schedule

        
        new_date_schedule = DateSchedule(
            date=wd,
            schedule=schedule_template
        )

        schedules.append(new_date_schedule)

    return schedules

def get_working_days_on_sprint(project_calendar: ProjectCalendar) -> list[DateSchedule]:
    """
    Obtiene los dias laborables en un sprint de proyecto.
    """
    initial_date = convert_to_operational_date(project_calendar.current_sprint.initial_date)

    final_date = convert_to_operational_date(project_calendar.current_sprint.final_date)

    templates = project_calendar.schedule_templates

    day_templates, date_templates, n_working_days, n_working_dates = substract_not_working_days(templates)

    working_days =  run_through_dates(
        initial_date=initial_date,
        final_date=final_date,
        difference=timedelta(days=1),
        exclude_dates=n_working_dates,
        exclude_days=n_working_days
    )



    return working_days

    #TODO: ajustar cambias para devolver el nuevo tipo DateSchedule

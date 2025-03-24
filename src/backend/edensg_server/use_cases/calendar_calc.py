from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, Date
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

def run_through_dates(*, 
    initial_date: date,
    final_date: date, 
    difference: timedelta, 
    exclude_dates: list[date] = None,
    exclude_days: list[EnumDays] = None
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
    
    exclude_dates: set = set(exclude_dates)
    exclude_days: set = set(exclude_days)

    while not auxiliar_date == final_date + difference:

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

def get_working_days_on_sprint(project_calendar: ProjectCalendar) -> list[Date]:
    """
    Obtiene los dias laborables en un sprint de proyecto.
    """
    initial_date = convert_to_operational_date(project_calendar.current_sprint.initial_date)

    final_date = convert_to_operational_date(project_calendar.current_sprint.final_date)

    templates = project_calendar.schedule_templates

    exclude_dates = []
    exclude_days = []
    
    day_templates = templates.by_day
    date_templates = templates.by_date
    
    if day_templates:
        exclude_days = [template.day.value - 1 for template in day_templates if not template.schedule.is_working_day]
    if date_templates:
        exclude_dates = [convert_to_operational_date(template.date) for template in date_templates if not template.schedule.is_working_day]

    return run_through_dates(
        initial_date=initial_date,
        final_date=final_date,
        difference=timedelta(days=1),
        exclude_dates=exclude_dates,
        exclude_days=exclude_days
    )


from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, Date
from datetime import date, timedelta

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

def run_through_dates(*, initial_date: Date, final_date: Date, difference: timedelta, exclude: list[Date] = None)-> list[Date]:
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

    while not auxiliar_date == final_date + difference:

        new_date = Date(**
            {
                "day": auxiliar_date.day,
                "month": auxiliar_date.month,
                "year": auxiliar_date.year
            }
        )
        auxiliar_date += difference


        if exclude and new_date in exclude:
            exclude.remove(new_date)
            continue

        between_dates.append(new_date)

    return between_dates

def get_working_days_on_sprint(project_calendar: ProjectCalendar) -> list[Date]:
    """
    Obtiene los dias laborables en un sprint de proyecto.
    """
    initial_date = convert_to_operational_date(project_calendar.current_sprint.initial_date)

    final_date = convert_to_operational_date(project_calendar.current_sprint.final_date)

    not_working_days = project_calendar.not_working_days.copy() if project_calendar.not_working_days else None

    return run_through_dates(
        initial_date=initial_date,
        final_date=final_date,
        difference=timedelta(days=1),
        exclude=not_working_days
    )


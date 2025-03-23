from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, Date
from datetime import date, timedelta

def get_working_days_on_sprint(project_calendar: ProjectCalendar) -> list[Date]:
    sprint_initial_date: Date = project_calendar.current_sprint.initial_date
    initial_date = date(sprint_initial_date.year, sprint_initial_date.month.value, sprint_initial_date.day)

    sprint_final_date: Date = project_calendar.current_sprint.final_date
    final_date = date(sprint_final_date.year, sprint_final_date.month.value, sprint_final_date.day)

    auxiliar_date = initial_date
    diff = timedelta(days=1)

    between_dates = []

    while not auxiliar_date == final_date + diff:
        
        new_date = Date(**
            {
                "day": auxiliar_date.day,
                "month": auxiliar_date.month,
                "year": auxiliar_date.year
            }
        )
        auxiliar_date += diff

        between_dates.append(new_date)

    return between_dates


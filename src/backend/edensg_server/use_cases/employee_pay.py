from backend.edensg_server.domain.entities.project_calendar import DateSchedule


def calc_employee_salary(
    month_salary: float,
    working_dates: list[DateSchedule],
    attendance_list: list[DateSchedule]
)->float:
    """
    Calcula el salario por periodo (sprint) del empleado con base en sus horarios asignados
    y su asistencia.

    :param month_salary: Salario de empleado (por hora)

    :param working_dates: Fechas de trabajo marcadas en el calendario, correspondientes
    al periodo sobre el cuál se quiere calcular el salario

    :param attendance_list: Fechas de asistencia del empleado, junto a sus horarios de asistencia

    :returns:
    Salario bruto calculado para el empleado.
    """

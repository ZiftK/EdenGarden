from backend.edensg_server.domain.entities.project_calendar import DateSchedule


def calc_employee_salary(
    hour_salary: float,
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
    total_salary = 0.0
    
    # Convert attendance list to a dictionary for easier lookup
    attendance_dict = {
        (att.date.day, att.date.month, att.date.year): att 
        for att in attendance_list
    }
    
    for working_date in working_dates:
        # Skip if not a working day
        if not working_date.schedule.is_working_day:
            continue
            
        # Get the date key for lookup
        date_key = (working_date.date.day, working_date.date.month, working_date.date.year)
        
        # Check if employee attended this day
        if date_key in attendance_dict:
            attendance = attendance_dict[date_key]
            
            # Calculate hours worked
            if attendance.schedule.initial_time and attendance.schedule.final_time:
                hours_worked = (
                    attendance.schedule.final_time.hours - attendance.schedule.initial_time.hours +
                    (attendance.schedule.final_time.minutes - attendance.schedule.initial_time.minutes) / 60
                )
                
                # Add to total salary
                total_salary += hours_worked * hour_salary
    
    return total_salary

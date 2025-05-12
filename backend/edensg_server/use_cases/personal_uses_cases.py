from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository
from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.domain.entities.project_calendar import DateSchedule
from typing import List
from .calendar_uses_cases import get_working_days_on_sprint

class PersonalUseCases:
    def __init__(self, employee_repository: EmployeeRepository, project_repository: ProjectRepository):
        self.employee_repository = employee_repository
        self.project_repository = project_repository

    async def view_personal_payroll(self, employee_id: int) -> Employee:
        """
        Devuelve la nómina personal de un empleado.
        Args:
            employee_id: ID del empleado
        Raises:
            ValueError: Si el empleado no existe
        Returns:
            Employee: Información de nómina del empleado
        """
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
        return empleados[0]

    async def view_personal_schedule(self, employee_id: int, project_id: str) -> List[DateSchedule]:
        """
        Devuelve el horario personal de un empleado en un proyecto específico.
        Args:
            employee_id: ID del empleado
            project_id: ID del proyecto
        Raises:
            ValueError: Si el empleado o el proyecto no existen
        Returns:
            List[DateSchedule]: Lista de fechas y horarios personales
        """
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
        
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        
        proyecto = proyectos[0]
        calendario = proyecto.calendar
        return get_working_days_on_sprint(calendario)

    async def calculate_employee_pay(self, 
        hour_salary: float,
        working_dates: list[DateSchedule],
        attendance_list: list[DateSchedule]
    ) -> float:
        """
        Calcula el salario por periodo (sprint) del empleado con base en sus horarios asignados
        y su asistencia.

        Args:
            hour_salary: Salario del empleado (por hora)
            working_dates: Fechas de trabajo marcadas en el calendario
            attendance_list: Fechas de asistencia del empleado

        Returns:
            float: Salario bruto calculado para el empleado
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
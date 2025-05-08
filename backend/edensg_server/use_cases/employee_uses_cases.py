from typing import Optional, List
from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository
from backend.edensg_server.adapters.repository.project_repository_interface import ProjectRepository
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.domain.entities.project_calendar import ProjectCalendar, DateSchedule
from .calendar_uses_cases import get_working_days_on_sprint

class EmployeeUseCases:
    def __init__(self, employee_repository: EmployeeRepository, project_repository: ProjectRepository):
        self.employee_repository = employee_repository
        self.project_repository = project_repository

    async def register_employee(
        self,
        name: str,
        address: str,
        phone_number: str,
        email: Optional[str],
        hire_date: str,
        role: str,
        salary: float,
        licenses: list[str],
        in_time: Optional[str] = None,
        out_time: Optional[str] = None
    ) -> int:
        """
        Registra un nuevo empleado en el sistema.
        
        Args:
            name: Nombre completo del empleado
            address: Dirección del empleado
            phone_number: Número de teléfono
            email: Correo electrónico (opcional)
            hire_date: Fecha de contratación
            role: Rol o puesto del empleado
            salary: Salario del empleado
            licenses: Lista de licencias/certificaciones
            in_time: Hora de entrada (opcional)
            out_time: Hora de salida (opcional)
            
        Returns:
            int: ID del empleado registrado
        """
        employee = Employee(
            id=0,  # El ID será asignado por la base de datos
            name=name,
            address=address,
            phone_number=phone_number,
            email=email,
            hire_date=hire_date,
            role=role,
            salary=salary,
            licenses=licenses,
            in_time=in_time,
            out_time=out_time
        )
        
        employee_id = await self.employee_repository.create_employee(employee)
        return employee_id

    async def delete_employee(self, employee_id: int) -> None:
        """
        Elimina un empleado del sistema si existe.
        Args:
            employee_id: ID del empleado a eliminar
        Raises:
            ValueError: Si el empleado no existe
        """
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
        await self.employee_repository.drop_employee_data(employee_id)

    async def view_all_payrolls(self) -> List[Employee]:
        """
        Devuelve la nómina (información salarial) de todos los empleados.
        Returns:
            List[Employee]: Lista de empleados con su información de nómina
        """
        empleados = await self.employee_repository.find_employees("all", search_by="all")
        return empleados

    async def update_payroll(self, employee_id: int, new_salary: float) -> None:
        """
        Modifica la nómina (salario) de un empleado específico.
        Args:
            employee_id: ID del empleado
            new_salary: Nuevo salario para el empleado
        Raises:
            ValueError: Si el empleado no existe
        """
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
        empleado: Employee = empleados[0]
        empleado.salary = new_salary
        await self.employee_repository.update_employee_data(employee_id, empleado)

    async def view_project_schedule(self, project_id: str) -> List[DateSchedule]:
        """
        Devuelve los horarios (días laborables y sus horarios) de un proyecto específico.
        Args:
            project_id: ID del proyecto
        Raises:
            ValueError: Si el proyecto no existe
        Returns:
            List[DateSchedule]: Lista de fechas y sus horarios
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto = proyectos[0]
        calendario = proyecto.calendar
        return get_working_days_on_sprint(calendario)

    async def update_project_schedule(self, project_id: str, new_calendar: ProjectCalendar) -> None:
        """
        Modifica el calendario (horario) de un proyecto específico.
        Args:
            project_id: ID del proyecto
            new_calendar: Nuevo calendario (horario) para el proyecto
        Raises:
            ValueError: Si el proyecto no existe
        """
        proyectos = await self.project_repository.find_projects(project_id, search_by="id")
        if not proyectos:
            raise ValueError(f"El proyecto con ID {project_id} no existe.")
        proyecto = proyectos[0]
        proyecto.calendar = new_calendar
        await self.project_repository.update_project_data(project_id, proyecto)

    async def update_employee(
        self,
        employee_id: int,
        name: Optional[str] = None,
        address: Optional[str] = None,
        phone_number: Optional[str] = None,
        email: Optional[str] = None,
        role: Optional[str] = None,
        salary: Optional[float] = None,
        licenses: Optional[list[str]] = None,
        in_time: Optional[str] = None,
        out_time: Optional[str] = None
    ) -> None:
        """
        Actualiza la información de un empleado existente.
        
        Args:
            employee_id: ID del empleado a actualizar
            name: Nuevo nombre (opcional)
            address: Nueva dirección (opcional)
            phone_number: Nuevo número de teléfono (opcional)
            email: Nuevo correo electrónico (opcional)
            role: Nuevo rol o puesto (opcional)
            salary: Nuevo salario (opcional)
            licenses: Nueva lista de licencias (opcional)
            in_time: Nueva hora de entrada (opcional)
            out_time: Nueva hora de salida (opcional)
            
        Raises:
            ValueError: Si el empleado no existe
        """
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
            
        empleado: Employee = empleados[0]
        
        # Actualizar solo los campos proporcionados
        if name is not None:
            empleado.name = name
        if address is not None:
            empleado.address = address
        if phone_number is not None:
            empleado.phone_number = phone_number
        if email is not None:
            empleado.email = email
        if role is not None:
            empleado.role = role
        if salary is not None:
            empleado.salary = salary
        if licenses is not None:
            empleado.licenses = licenses
        if in_time is not None:
            empleado.in_time = in_time
        if out_time is not None:
            empleado.out_time = out_time
            
        await self.employee_repository.update_employee_data(employee_id, empleado)
from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository
from backend.edensg_server.domain.entities.employee import Employee
from typing import Optional

class UpdatePayrollUseCase:
    def __init__(self, employee_repository: EmployeeRepository):
        self.employee_repository = employee_repository

    async def execute(self, employee_id: int, new_salary: float) -> None:
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
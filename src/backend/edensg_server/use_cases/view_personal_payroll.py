from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository
from backend.edensg_server.domain.entities.employee import Employee

class ViewPersonalPayrollUseCase:
    def __init__(self, employee_repository: EmployeeRepository):
        self.employee_repository = employee_repository

    async def execute(self, employee_id: int) -> Employee:
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
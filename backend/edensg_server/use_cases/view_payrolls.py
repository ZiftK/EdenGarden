from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository
from backend.edensg_server.domain.entities.employee import Employee
from typing import List

class ViewPayrollsUseCase:
    def __init__(self, employee_repository: EmployeeRepository):
        self.employee_repository = employee_repository

    async def execute(self) -> List[Employee]:
        """
        Devuelve la nómina (información salarial) de todos los empleados.
        Returns:
            List[Employee]: Lista de empleados con su información de nómina
        """
        empleados = await self.employee_repository.find_employees("all", search_by="all")
        return empleados 
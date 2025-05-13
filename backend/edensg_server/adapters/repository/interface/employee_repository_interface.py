from abc import ABC
from backend.edensg_server.domain.entities.employee import Employee


class EmployeeRepository(ABC):

    async def create_employee(self, data: Employee) -> int:
        """Inserta un nuevo empleado en la base de datos."""

    async def find_employees(self, identifier: str, search_by: str = "id") -> list[Employee]:
        """Busca empleados por un campo específico."""

    async def update_employee_data(self, id: str, data: Employee) -> None:
        """Actualiza la información de un empleado."""

    async def drop_employee_data(self, id: int) -> None:
        """Elimina un empleado de la base de datos."""

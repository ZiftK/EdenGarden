from abc import ABC, abstractmethod
from backend.edensg_server.domain.entities.employee import Employee


class EmployeeRepository(ABC):

    @abstractmethod
    def create_employee(self, data: Employee) -> int:
        """Inserta un nuevo empleado en la base de datos."""

    @abstractmethod
    def get_all_employees(self) -> list[Employee]:
        """Obtiene todos los empleados de la base de datos."""

    @abstractmethod
    def find_employee_by_id(self, id: int) -> list[Employee]:
        """Busca empleados por id."""

    @abstractmethod
    def find_employees_by_ids(self, ids: list[int]) -> list[Employee]:
        """Busca empleados por ids."""
    
    @abstractmethod
    def find_employee_by_name(self, name: str) -> list[Employee]:
        """Busca empleados por nombre."""

    @abstractmethod
    def find_employee_by_email(self, email: str) -> list[Employee]:
        """Busca empleados por email."""
    
    @abstractmethod
    def update_employee_data(self, id: int, data: Employee) -> None:
        """Actualiza la información de un empleado."""

    @abstractmethod
    def delete_employee_data(self, id: int) -> None:
        """Elimina un empleado de la base de datos."""

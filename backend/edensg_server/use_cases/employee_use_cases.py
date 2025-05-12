from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository as employee_repository
from backend.edensg_server.domain.entities.employee import Employee

class EmployeeController:
    def __init__(self):
        self.employee_repository = employee_repository

    def get_all_employees(self) -> list[Employee]:
        return self.employee_repository.find_all()

    def get_employee_by_id(self, id: int) -> Employee:
        response = self.employee_repository.find_employee_by_id(id)
        if not response:
            raise ValueError(f"El empleado con ID {id} no existe.")
        return response

    def get_employee_by_name(self, name: str) -> Employee:
        response = self.employee_repository.find_employee_by_name(name)
        if not response:
            raise ValueError(f"No existe un empleado con nombre {name}.")
        return response
    
    def get_employee_by_email(self, email: str) -> Employee:
        response = self.employee_repository.find_employee_by_email(email)
        if not response:
            raise ValueError(f"No existe un empleado con email {email}.")
        return response

    def create_employee(self, employee: Employee) -> Employee:
        return self.employee_repository.create_employee(employee)
    
    

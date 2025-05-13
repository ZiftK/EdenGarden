from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository as employee_repository
from backend.edensg_server.domain.entities.employee import Employee
from typing import List, Dict, Any

class EmployeeController:
    def __init__(self):
        self.employee_repository = employee_repository

    def get_all_employees(self) -> Dict[str, Any]:
        employees = self.employee_repository.find_all()
        return {
            'message': 'Empleados obtenidos correctamente',
            'data': employees
        }

    def get_employee_by_id(self, id: int) -> Dict[str, Any]:
        response = self.employee_repository.find_employee_by_id(id)
        if not response:
            raise ValueError(f"El empleado con ID {id} no existe.")
        return {
            'message': 'Empleado encontrado correctamente',
            'data': response
        }

    def get_employee_by_name(self, name: str) -> Dict[str, Any]:
        response = self.employee_repository.find_employee_by_name(name)
        if not response:
            raise ValueError(f"No existe un empleado con nombre {name}.")
        return {
            'message': 'Empleado encontrado correctamente',
            'data': response
        }
    
    def get_employee_by_email(self, email: str) -> Dict[str, Any]:
        response = self.employee_repository.find_employee_by_email(email)
        if not response:
            raise ValueError(f"No existe un empleado con email {email}.")
        return {
            'message': 'Empleado encontrado correctamente',
            'data': response
        }

    def create_employee(self, employee: Employee) -> Dict[str, Any]:
        response = self.employee_repository.create_employee(employee)
        if response:
            return {
                'message': 'Empleado creado correctamente',
                'data': {'employee_id': response}
            }
        else:
            raise Exception("Error al crear el empleado")
    
    def delete_employee(self, id: int) -> Dict[str, Any]:
        response = self.employee_repository.delete_employee_data(id).data
        if response:
            return {
                'message': 'Empleado eliminado correctamente',
                'data': response
            }
        else:
            raise Exception("Error al eliminar el empleado")

    def update_employee(self, id: int, employee: Employee) -> Dict[str, Any]:
        # Primero verificamos que el empleado exista
        try:
            self.employee_repository.find_employee_by_id(id)
            self.employee_repository.update_employee_data(id, employee)
            return {
                'message': 'Empleado actualizado correctamente',
                'data': {'employee_id': id}
            }
        except Exception as e:
            raise Exception(f"Error al actualizar el empleado: {str(e)}")

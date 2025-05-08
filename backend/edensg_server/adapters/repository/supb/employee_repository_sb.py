from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.interface.employee_repository_interface import EmployeeRepository
import asyncio

class EmployeeRepositorySB(EmployeeRepository):
    def __init__(self):
        self.client = supabase_client
        self.table = 'empleado'

    def create_employee(self, data: Employee) -> int:
        """Inserta un nuevo empleado en la base de datos."""
        data_dict = data.model_dump(exclude={'id_empleado'})
        response = self.client.table(self.table).insert(data_dict).execute()
        return response.data[0]['id_empleado']

    def get_all_employees(self) -> Employee:
        """Obtiene todos los empleados de la base de datos."""
        response = self.client.table(self.table).select('*').execute()
        return [Employee(**employee) for employee in response.data]

    def find_employee_by_id(self, id: int) -> list[Employee]:
        """Busca empleados por id."""
        response = self.client.table(self.table).select('*').eq('id_empleado', id).execute()
        data = response.data[0]
        return Employee(**data) 
    
    def find_employees_by_ids(self, ids: list[int]) -> list[Employee]:
        """Busca empleados por ids."""
        response = self.client.table(self.table).select('*').in_('id_empleado', ids).execute()
        return [Employee(**employee) for employee in response.data]

    def find_employee_by_name(self, name: str) -> list[Employee]:
        """Busca empleados por nombre."""
        response = self.client.table(self.table).select('*').ilike('nombre', f'%{name}%').execute()
        return [Employee(**employee) for employee in response.data]

    def find_employee_by_email(self, email: str) -> list[Employee]:
        """Busca empleados por email."""
        response = self.client.table(self.table).select('*').eq('email', email).execute()
        return [Employee(**employee) for employee in response.data]

    def update_employee_data(self, id: int, data: Employee) -> None:
        """Actualiza la información de un empleado."""
        self.client.table(self.table).update(data.model_dump(exclude={'id_empleado'})).eq('id_empleado', id).execute()

    def delete_employee_data(self, id: int) -> None:
        """Elimina un empleado de la base de datos."""
        self.client.table(self.table).delete().eq('id_empleado', id).execute()

async def main():
    repo = EmployeeRepositorySB()
    repo.delete_employee_data(16)


if __name__ == "__main__":
    asyncio.run(main())


employee_sb_repository = EmployeeRepositorySB()
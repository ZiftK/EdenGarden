from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.employee import Employee, Attendance
from backend.edensg_server.adapters.repository.interface.employee_repository_interface import EmployeeRepository
from backend.edensg_server.domain.entities.project_calendar import Date, Time, EnumMonths
from datetime import datetime
from backend.edensg_server.adapters.repository.supb.formatter_from_db import format_employee
from typing import Optional

class EmployeeRepositorySB(EmployeeRepository):
    def __init__(self):
        self.client = supabase_client
        self.table = 'empleado'

    def create_employee(self, data: Employee) -> int:
        """Inserta un nuevo empleado en la base de datos."""
        data_dict = {
            "nombre": data.nombre,
            "direccion": data.direccion,
            "telefono": data.telefono,
            "email": data.email,
            "fecha_contratacion": str(data.fecha_contratacion),
            "clave": data.clave,
            "rol": data.rol,
            "puesto": data.puesto,
            "salario": data.salario,
            'img': data.img,
        }
        response = self.client.table(self.table).insert(data_dict).execute()
        return response.data[0]['id_empleado']

    def find_all(self) -> list[Employee]:
        """Obtiene todos los empleados de la base de datos."""
        response = self.client.table(self.table).select('*').execute()
        return [format_employee(employee) for employee in response.data]

    def find_employee_by_id(self, id: int) -> Employee:
        """Busca un empleado por su ID."""
        try:
            response = self.client.table(self.table).select('*').eq('id_empleado', id).execute()
            if not response.data:
                raise Exception(f"No se encontró el empleado con ID {id}")
            
            employee_data = response.data[0]
            print(f"Datos del empleado encontrado: {employee_data}")  # Debug log
            
            # Asegurarnos de que los campos requeridos existan
            required_fields = ['nombre', 'direccion', 'telefono', 'fecha_contratacion', 'clave', 'rol', 'puesto', 'salario']
            missing_fields = [field for field in required_fields if field not in employee_data]
            
            if missing_fields:
                raise Exception(f"Faltan campos requeridos en el empleado: {', '.join(missing_fields)}")
            
            return format_employee(employee_data)
        except Exception as e:
            print(f"Error al buscar empleado con ID {id}: {str(e)}")  # Debug log
            raise Exception(f"Error al buscar empleado con ID {id}: {str(e)}")

    def find_employees_by_ids(self, ids: list[int]) -> list[Employee]:
        """Busca empleados por ids."""
        response = self.client.table(self.table).select('*').in_('id_empleado', ids).execute()
        return [Employee(**employee) for employee in response.data]

    def find_employee_by_name(self, name: str) -> list[Employee]:
        """Busca empleados por nombre."""
        response = self.client.table(self.table).select('*').ilike('nombre', f'%{name}%').execute()
        return [format_employee(employee) for employee in response.data]

    def find_employee_by_email(self, email: str) -> list[Employee]:
        """Busca empleados por email."""
        response = self.client.table(self.table).select('*').eq('email', email).execute()
        return [format_employee(employee) for employee in response.data]

    def update_employee(self, id: int, data: Employee) -> None:
        """Actualiza la información de un empleado."""
        data_dict = {
            "nombre": data.nombre,
            "direccion": data.direccion,
            "telefono": data.telefono,
            "email": data.email,
            "fecha_contratacion": str(data.fecha_contratacion),
            "clave": data.clave,
            "rol": data.rol,
            "puesto": data.puesto,
            "salario": data.salario,
            'img': data.img,
        }
        self.client.table(self.table).update(data_dict).eq('id_empleado', id).execute()

    def delete_employee(self, id: int) -> None:
        """Elimina un empleado del sistema."""
        self.client.table(self.table).delete().eq('id_empleado', id).execute()

    def get_employee_attendance(self, employee_id: int, sprint_id: int) -> list[Attendance]:
        """Obtiene los registros de asistencia de un empleado en un sprint."""
        response = self.client.table('asistencia').select('*').eq('fk_empleado', employee_id).eq('fk_sprint', sprint_id).execute()
        return [Attendance(**record) for record in response.data]

    def create_attendance(self, employee_id: int, date: datetime.date, entry_time: str, exit_time: Optional[str] = None) -> int:
        """Crea un nuevo registro de asistencia."""
        data = {
            'fk_empleado': employee_id,
            'fecha': str(date),
            'hora_entrada': entry_time,
            'hora_salida': exit_time
        }
        response = self.client.table('asistencia').insert(data).execute()
        return response.data[0]['id_asistencia']

    def search_employees_by_id(self, id_pattern: str) -> list[Employee]:
        """Busca empleados por coincidencia parcial de ID."""
        response = self.client.table(self.table).select('*').ilike('id_empleado', f'%{id_pattern}%').execute()
        return [format_employee(employee) for employee in response.data]

    def update_employee_roles(self, old_role: str, new_role: str) -> None:
        """
        Actualiza el rol de todos los empleados que tengan old_role a new_role.
        """
        try:
            self.client.table(self.table).update({'rol': new_role}).eq('rol', old_role).execute()
        except Exception as e:
            raise Exception(f"Error al actualizar roles en la base de datos: {str(e)}")

def main():
    repo = EmployeeRepositorySB()
    
    # Fechas de prueba
    start_date = Date(dia=6, mes=EnumMonths.MAY, anno=2025)
    end_date = Date(dia=10, mes=EnumMonths.MAY, anno=2025)
    
    # Obtener asistencia del empleado con ID 1
    attendance_records = repo.get_employee_attendance(1, 1)
    
    # Imprimir los registros de asistencia
    print(f"\nRegistros de asistencia para el empleado ID 1 entre {start_date} y {end_date}:")
    for record in attendance_records:
        print(f"\nFecha: {record.fecha}")
        print(f"Hora de entrada: {record.hora_entrada}")
        print(f"Hora de salida: {record.hora_salida}")
        print(f"Horas trabajadas: {record.horas_trabajadas}")
        print(f"Horas extra: {record.horas_extra}")

if __name__ == "__main__":
    main()

# Instancia global del repositorio
employee_sb_repository = EmployeeRepositorySB()
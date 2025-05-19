from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.employee import Employee, Attendance
from backend.edensg_server.adapters.repository.interface.employee_repository_interface import EmployeeRepository
from backend.edensg_server.domain.entities.project_calendar import Date, Time, EnumMonths
from datetime import datetime
from backend.edensg_server.adapters.repository.supb.formatter_from_db import format_employee

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
            "fk_equipo": data.equipo
        }
        response = self.client.table(self.table).insert(data_dict).execute()
        return response.data[0]['id_empleado']

    def find_all(self) -> list[Employee]:
        """Obtiene todos los empleados de la base de datos."""
        response = self.client.table(self.table).select('*').execute()
        return [format_employee(employee) for employee in response.data]

    def find_employee_by_id(self, id: int) -> Employee:
        """Busca empleados por id."""
        response = self.client.table(self.table).select('*').eq('id_empleado', id).execute()
        
        if not response.data:
            raise Exception(f"Empleado con ID {id} no encontrado")
            
        data = format_employee(response.data[0])
        return data

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

    def update_employee_data(self, id: int, data: Employee) -> None:
        """Actualiza la información de un empleado."""
        data_dict = data.model_dump(exclude={'id_empleado'})
        self.client.table(self.table).update(data_dict).eq('id_empleado', id).execute()

    def delete_employee_data(self, id: int) -> bool:
        """Elimina un empleado de la base de datos."""
        return self.client.table(self.table).delete().eq('id_empleado', id).execute()

    def get_employee_attendance(self, employee_id: int, start_date: Date, end_date: Date) -> list[Attendance]:
        """
        Obtiene los registros de asistencia de un empleado en un rango de fechas.
        
        Args:
            employee_id: ID del empleado
            start_date: Fecha inicial del rango
            end_date: Fecha final del rango
            
        Returns:
            list[Attendance]: Lista de registros de asistencia
        """
        response = self.client.table('asistencia').select('*').eq('fk_empleado', employee_id).gte('fecha', str(start_date)).lte('fecha', str(end_date)).order('fecha').order('hora_entrada').execute()
        
        attendance_records = []
        for attendance in response.data:
            # Convertir la fecha string a objeto Date
            fecha = datetime.strptime(attendance['fecha'], '%Y-%m-%d')
            fecha_obj = Date(
                dia=fecha.day,
                mes=EnumMonths(fecha.month),
                anno=fecha.year
            )
            
            # Convertir horas trabajadas y extra a objetos Time
            horas_trabajadas = datetime.strptime(str(attendance['horas_trabajadas']), '%H:%M:%S')
            horas_trabajadas_obj = Time(
                hora=horas_trabajadas.hour,
                minuto=horas_trabajadas.minute,
                segundo=horas_trabajadas.second
            )
            
            horas_extra = datetime.strptime(str(attendance['horas_extra']), '%H:%M:%S')
            horas_extra_obj = Time(
                hora=horas_extra.hour,
                minuto=horas_extra.minute,
                segundo=horas_extra.second
            )
            
            # Crear el objeto Attendance con los valores convertidos
            attendance_obj = Attendance(
                id_asistencia=attendance['id_asistencia'],
                fk_empleado=attendance['fk_empleado'],
                fecha=fecha_obj,
                hora_entrada=attendance['hora_entrada'],
                hora_salida=attendance['hora_salida'],
                horas_trabajadas=horas_trabajadas_obj,
                horas_extra=horas_extra_obj
            )
            attendance_records.append(attendance_obj)
            
        return attendance_records

def main():
    repo = EmployeeRepositorySB()
    
    # Fechas de prueba
    start_date = Date(dia=6, mes=EnumMonths.MAY, anno=2025)
    end_date = Date(dia=10, mes=EnumMonths.MAY, anno=2025)
    
    # Obtener asistencia del empleado con ID 1
    attendance_records = repo.get_employee_attendance(1, start_date, end_date)
    
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


employee_sb_repository = EmployeeRepositorySB()
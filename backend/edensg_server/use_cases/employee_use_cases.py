from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository as employee_repository
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.interface.employee_repository_interface import EmployeeRepository
from backend.edensg_server.adapters.repository.supb.image_repository_sb import ImageRepositorySupabase
from datetime import datetime, timedelta
from typing import List, Optional

class EmployeeController:
    def __init__(self):
        self.employee_repository = employee_repository
        self.image_repository = ImageRepositorySupabase()

    def create_employee(self, employee: Employee) -> int:
        """Crea un nuevo empleado en el sistema."""
        return self.employee_repository.create_employee(employee)

    def find_employee_by_id(self, id: int) -> Optional[Employee]:
        """Busca un empleado por su ID."""
        return self.employee_repository.find_employee_by_id(id)

    def get_employee_by_id(self, id: int) -> Dict[str, Any]:
        response = self.employee_repository.find_employee_by_id(id)
        if not response:
            raise ValueError(f"El empleado con ID {id} no existe.")
        return {
            'message': 'Empleado encontrado correctamente',
            'data': response
        }

    def delete_employee(self, id: int) -> None:
        """Elimina un empleado del sistema."""
        self.employee_repository.delete_employee(id)

    def calculate_employee_salary(self, employee_id: int, sprint_id: int) -> float:
        """
        Calcula el salario del empleado basado en su asistencia durante un sprint.
        
        Args:
            employee_id: ID del empleado
            sprint_id: ID del sprint
            
        Returns:
            float: Salario calculado
        """
        employee = self.find_employee_by_id(employee_id)
        if not employee:
            raise ValueError(f"Employee with ID {employee_id} not found")

        # Obtener la asistencia del empleado en el sprint
        attendance = self.employee_repository.get_employee_attendance(employee_id, sprint_id)
        
        # Calcular horas trabajadas
        total_hours = 0
        for record in attendance:
            if record.hora_salida:
                entry_time = datetime.strptime(record.hora_entrada, "%H:%M:%S")
                exit_time = datetime.strptime(record.hora_salida, "%H:%M:%S")
                hours_worked = (exit_time - entry_time).total_seconds() / 3600
                total_hours += hours_worked

        # Calcular salario base
        base_salary = employee.salario * (total_hours / 40)  # Asumiendo 40 horas semanales

        # Calcular horas extras
        overtime_hours = max(0, total_hours - 40)
        overtime_pay = overtime_hours * (employee.salario * 1.5)  # 1.5x el salario por hora extra

        return base_salary + overtime_pay

    def calculate_overtime(self, employee_id: int, sprint_id: int) -> float:
        """
        Calcula las horas extras de un empleado en un sprint.
        
        Args:
            employee_id: ID del empleado
            sprint_id: ID del sprint
            
        Returns:
            float: Horas extras trabajadas
        """
        employee = self.find_employee_by_id(employee_id)
        if not employee:
            raise ValueError(f"Employee with ID {employee_id} not found")

        # Obtener la asistencia del empleado en el sprint
        attendance = self.employee_repository.get_employee_attendance(employee_id, sprint_id)
        
        # Calcular horas trabajadas
        total_hours = 0
        for record in attendance:
            if record.hora_salida:
                entry_time = datetime.strptime(record.hora_entrada, "%H:%M:%S")
                exit_time = datetime.strptime(record.hora_salida, "%H:%M:%S")
                hours_worked = (exit_time - entry_time).total_seconds() / 3600
                total_hours += hours_worked

        # Calcular horas extras (más de 40 horas por semana)
        overtime_hours = max(0, total_hours - 40)
        return overtime_hours

    def register_attendance(self, employee_id: int, entry_time: str, exit_time: Optional[str] = None) -> int:
        """
        Registra la asistencia de un empleado.
        
        Args:
            employee_id: ID del empleado
            entry_time: Hora de entrada en formato "HH:MM:SS"
            exit_time: Hora de salida en formato "HH:MM:SS" (opcional)
            
        Returns:
            int: ID del registro de asistencia creado
            
        Raises:
            ValueError: Si el empleado no existe o los datos son inválidos
        """
        # Verificar que el empleado existe
        employee = self.find_employee_by_id(employee_id)
        if not employee:
            raise ValueError(f"Employee with ID {employee_id} not found")
            
        # Validar formato de hora
        try:
            datetime.strptime(entry_time, "%H:%M:%S")
            if exit_time:
                datetime.strptime(exit_time, "%H:%M:%S")
        except ValueError:
            raise ValueError("Invalid time format. Use HH:MM:SS")
            
        # Obtener la fecha actual
        current_date = datetime.now().date()
        
        # Crear el registro de asistencia
        attendance_id = self.employee_repository.create_attendance(
            employee_id=employee_id,
            date=current_date,
            entry_time=entry_time,
            exit_time=exit_time
        )
        
        return attendance_id

    async def update_employee_image(self, employee_id: int, image_url: str) -> str:
        """Actualiza la imagen de perfil de un empleado desde una URL."""
        try:
            # Subir la imagen a Supabase Storage
            public_url = await self.image_repository.update_employee_image(employee_id, image_url)
            
            # Actualizar la URL de la imagen en la base de datos
            employee = self.find_employee_by_id(employee_id)
            if employee:
                employee.img_url = public_url
                self.update_employee(employee_id, employee)
            
            return public_url
        except Exception as e:
            raise Exception(f"Error al actualizar la imagen del empleado: {str(e)}")

    async def update_employee_image_base64(self, employee_id: int, base64_image: str) -> str:
        """Actualiza la imagen de perfil de un empleado desde una imagen en base64."""
        try:
            # Subir la imagen a Supabase Storage
            public_url = await self.image_repository.upload_base64_image(base64_image, employee_id)
            
            # Actualizar la URL de la imagen en la base de datos
            employee = self.find_employee_by_id(employee_id)
            if employee:
                employee.img_url = public_url
                self.update_employee(employee_id, employee)
            
            return public_url
        except Exception as e:
            raise Exception(f"Error al actualizar la imagen del empleado: {str(e)}")

    async def delete_employee_image(self, employee_id: int) -> bool:
        """Elimina la imagen de perfil de un empleado."""
        try:
            # Buscar la imagen en el bucket
            files = self.image_repository.client.storage.from_(self.image_repository.bucket_name).list()
            for file in files:
                if file['name'].startswith(f"employee_{employee_id}_"):
                    await self.image_repository.delete_image(file['name'])
            
            # Actualizar el empleado para eliminar la URL de la imagen
            employee = self.find_employee_by_id(employee_id)
            if employee:
                employee.img_url = None
                self.update_employee(employee_id, employee)
            
            return True
        except Exception as e:
            raise Exception(f"Error al eliminar la imagen del empleado: {str(e)}")
    
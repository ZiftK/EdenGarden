from typing import Optional
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository


class RegisterEmployeeUseCase:
    def __init__(self, employee_repository: EmployeeRepository):
        self.employee_repository = employee_repository

    async def execute(
        self,
        name: str,
        address: str,
        phone_number: str,
        email: Optional[str],
        hire_date: str,
        role: str,
        salary: float,
        licenses: list[str],
        in_time: Optional[str] = None,
        out_time: Optional[str] = None
    ) -> int:
        """
        Registra un nuevo empleado en el sistema.
        
        Args:
            name: Nombre completo del empleado
            address: Dirección del empleado
            phone_number: Número de teléfono
            email: Correo electrónico (opcional)
            hire_date: Fecha de contratación
            role: Rol o puesto del empleado
            salary: Salario del empleado
            licenses: Lista de licencias/certificaciones
            in_time: Hora de entrada (opcional)
            out_time: Hora de salida (opcional)
            
        Returns:
            int: ID del empleado registrado
        """
        # Crear instancia de Employee
        employee = Employee(
            id=0,  # El ID será asignado por la base de datos
            name=name,
            address=address,
            phone_number=phone_number,
            email=email,
            hire_date=hire_date,
            role=role,
            salary=salary,
            licenses=licenses,
            in_time=in_time,
            out_time=out_time
        )
        
        # Guardar el empleado en el repositorio
        employee_id = await self.employee_repository.create_employee(employee)
        
        return employee_id 
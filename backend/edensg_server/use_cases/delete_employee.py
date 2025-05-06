from backend.edensg_server.adapters.repository.employee_repository_interface import EmployeeRepository

class DeleteEmployeeUseCase:
    def __init__(self, employee_repository: EmployeeRepository):
        self.employee_repository = employee_repository

    async def execute(self, employee_id: int) -> None:
        """
        Elimina un empleado del sistema si existe.
        Args:
            employee_id: ID del empleado a eliminar
        Raises:
            ValueError: Si el empleado no existe
        """
        # Buscar el empleado por ID
        empleados = await self.employee_repository.find_employees(str(employee_id), search_by="id")
        if not empleados:
            raise ValueError(f"El empleado con ID {employee_id} no existe.")
        # Eliminar el empleado
        await self.employee_repository.drop_employee_data(employee_id) 
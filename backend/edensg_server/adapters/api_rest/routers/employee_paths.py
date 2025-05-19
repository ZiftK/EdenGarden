from fastapi import APIRouter, HTTPException
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import EmployeeRepositorySB
from backend.edensg_server.use_cases.employee_use_cases import EmployeeUseCases
from pydantic import BaseModel
from typing import Optional

router = APIRouter('employee')

employee_repository = EmployeeRepositorySB()
employee_use_cases = EmployeeUseCases(employee_repository)

class ImageUpdateRequest(BaseModel):
    image_url: str

class LoginRequest(BaseModel):
    email: str
    clave: str

class LoginResponse(BaseModel):
    success: bool
    employee: Optional[Employee] = None
    message: str

@router.get("/all")
async def get_employees():
    try:
        return employee_controller.get_all_employees()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/id/{employee_id}")
async def get_employee(employee_id: int):
    try:
        return employee_controller.get_employee_by_id(employee_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Empleado no encontrado: {str(e)}")

@router.get("/name/{employee_name}")
async def get_employee_by_name(employee_name: str):
    try:
        return employee_controller.get_employee_by_name(employee_name)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Empleado no encontrado: {str(e)}")

@router.get("/email/{employee_email}")
async def get_employee_by_email(employee_email: str):
    try:
        return employee_controller.get_employee_by_email(employee_email)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Empleado no encontrado: {str(e)}")

@router.post("/create")
async def create_employee(employee: Employee):
    try:
        return employee_controller.create_employee(employee)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update/{employee_id}")
async def update_employee(employee_id: int, employee: Employee):
    return employee_repository.update_employee(employee_id, employee)

@router.post("/{employee_id}/image")
async def update_employee_image(employee_id: int, request: ImageUpdateRequest):
    try:
        public_url = await employee_use_cases.update_employee_image(employee_id, request.image_url)
        return {"success": True, "image_url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{employee_id}/image")
async def delete_employee_image(employee_id: int):
    try:
        success = await employee_use_cases.delete_employee_image(employee_id)
        return {"success": success}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    try:
        # Buscar empleado por email
        employees = employee_repository.find_employee_by_email(request.email)
        
        if not employees:
            return LoginResponse(
                success=False,
                message="Credenciales inválidas"
            )
        
        employee = employees[0]  # Tomamos el primer empleado encontrado
        
        # Verificar la contraseña
        if employee.clave != request.clave:  # En producción, usar hash de contraseñas
            return LoginResponse(
                success=False,
                message="Credenciales inválidas"
            )
        
        return LoginResponse(
            success=True,
            employee=employee,
            message="Login exitoso"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

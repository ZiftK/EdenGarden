from fastapi import APIRouter, HTTPException, status
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import EmployeeRepositorySB
from backend.edensg_server.use_cases.employee_use_cases import EmployeeController
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix='/employee', tags=["employee"])

employee_repository = EmployeeRepositorySB()
employee_controller = EmployeeController()

class ImageUpdateRequest(BaseModel):
    image_url: Optional[str] = None
    base64_image: Optional[str] = None

class LoginRequest(BaseModel):
    expediente: str
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
        return await employee_controller.create_employee(employee)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update/{employee_id}")
async def update_employee(employee_id: int, employee: Employee):
    return employee_repository.update_employee(employee_id, employee)

@router.post("/{employee_id}/image")
async def update_employee_image(employee_id: int, request: ImageUpdateRequest):
    try:
        if request.image_url:
            public_url = await employee_controller.update_employee_image(employee_id, request.image_url)
        elif request.base64_image:
            public_url = await employee_controller.update_employee_image_base64(employee_id, request.base64_image)
        else:
            raise HTTPException(status_code=400, detail="Se requiere image_url o base64_image")
            
        return {"success": True, "image_url": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{employee_id}/image")
async def delete_employee_image(employee_id: int):
    try:
        success = await employee_controller.delete_employee_image(employee_id)
        return {"success": success}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    try:
        # Buscar empleado por expediente
        employee = employee_repository.find_employee_by_id(int(request.expediente))
        
        if not employee:
            return LoginResponse(
                success=False,
                message="Expediente no encontrado"
            )
        
        # Verificar la contraseña
        if employee.clave != request.clave:  # En producción, usar hash de contraseñas
            return LoginResponse(
                success=False,
                message="Contraseña incorrecta"
            )
        
        return LoginResponse(
            success=True,
            employee=employee,
            message="Login exitoso"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete('/delete/{id}', 
    response_model=dict,
    status_code=status.HTTP_200_OK,
    responses={
        200: {"description": "Empleado eliminado exitosamente", "content": {"application/json": {"example": {"message": "Empleado eliminado correctamente", "id": 1}}}},
        404: {"description": "Empleado no encontrado"},
        400: {"description": "Error al eliminar el empleado"}
    })
async def delete_employee(id: int):
    try:
        return employee_controller.delete_employee(id)
    except Exception as e:
        if "No se encontró el empleado" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/search/{search_term}")
async def search_employees(search_term: str):
    try:
        return employee_controller.search_employees(search_term)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

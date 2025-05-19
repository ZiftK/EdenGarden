from fastapi import APIRouter, HTTPException
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import EmployeeRepositorySB
from backend.edensg_server.use_cases.employee_use_cases import EmployeeUseCases
from pydantic import BaseModel

router = APIRouter('employee')

employee_repository = EmployeeRepositorySB()
employee_use_cases = EmployeeUseCases(employee_repository)

class ImageUpdateRequest(BaseModel):
    image_url: str

@router.get("/all")
async def get_employees():
    return employee_repository.find_all_employees()

@router.get("/id/{employee_id}")
async def get_employee(employee_id: int):
    return employee_repository.find_employee_by_id(employee_id)

@router.post("/create")
async def create_employee(employee: Employee):
    return employee_repository.create_employee(employee)

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

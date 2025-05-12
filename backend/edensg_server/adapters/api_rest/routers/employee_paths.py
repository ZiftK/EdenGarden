from fastapi import APIRouter, HTTPException    
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.use_cases.employee_use_cases import EmployeeController
router = APIRouter(prefix='/employee')

employee_controller = EmployeeController()

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

@router.post("/create")
async def create_employee(employee: Employee):
    try:
        return employee_controller.create_employee(employee)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/update/{employee_id}")
async def update_employee(employee_id: int, employee: Employee):
    try:
        return employee_controller.update_employee(employee_id, employee)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Empleado no encontrado: {str(e)}")

@router.delete("/delete/{employee_id}")
async def delete_employee(employee_id: int):
    try:
        return employee_controller.delete_employee(employee_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Empleado no encontrado: {str(e)}")

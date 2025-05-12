from fastapi import APIRouter
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.use_cases.employee_use_cases import EmployeeController
router = APIRouter(prefix='/employee')

employee_controller = EmployeeController()

@router.get("/all")
async def get_employees():
    return employee_controller.get_all_employees()

@router.get("/id/{employee_id}")
async def get_employee(employee_id: int):
    return employee_controller.get_employee_by_id(employee_id)

@router.post("/create")
async def create_employee(employee: Employee):
    return employee_controller.create_employee(employee)

@router.put("/update/{employee_id}")
async def update_employee(employee_id: int, employee: Employee):
    return employee_controller.update_employee(employee_id, employee)

from fastapi import APIRouter
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository as employee_repository
router = APIRouter(prefix='/employee')


@router.get("/all")
async def get_employees():
    return employee_repository.find_all()

@router.get("/id/{employee_id}")
async def get_employee(employee_id: int):
    return employee_repository.find_employee_by_id(employee_id)

@router.post("/create")
async def create_employee(employee: Employee):
    return employee_repository.create_employee(employee)

@router.put("/update/{employee_id}")
async def update_employee(employee_id: int, employee: Employee):
    return employee_repository.update_employee(employee_id, employee)

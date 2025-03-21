from typing import Optional
from pydantic import BaseModel
from .employee import Employee


class Team(BaseModel):
    name: str
    leader: Employee
    employees: list[Employee]

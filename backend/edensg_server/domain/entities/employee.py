from typing import Optional
from pydantic import BaseModel


class Employee(BaseModel):
    id: int
    name: str
    address: str
    phone_number: str
    email: Optional[str]
    hire_date: str
    role: str
    salary: float
    licenses: list[str]
    in_time: Optional[str]
    out_time: Optional[str]


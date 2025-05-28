from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List
from ..database import get_db
from ..models import Employee, Attendance, Payroll
from ..schemas import Payroll as PayrollSchema
import pandas as pd
from io import BytesIO
import base64

router = APIRouter()

def calculate_payroll(employee_id: int, start_date: datetime, end_date: datetime, db: Session):
    # Get employee
    employee = db.query(Employee).filter(Employee.id_empleado == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # Get attendances in date range
    attendances = db.query(Attendance).filter(
        Attendance.fk_empleado == employee_id,
        Attendance.fecha >= start_date,
        Attendance.fecha <= end_date
    ).all()

    # Calculate totals
    total_hours = 0.0
    total_extra_hours = 0.0
    
    for attendance in attendances:
        if attendance.horas_trabajadas:
            total_hours += float(attendance.horas_trabajadas)
        if attendance.horas_extra:
            total_extra_hours += float(attendance.horas_extra)

    # Calculate payroll
    base_salary = employee.salario / 2  # Monthly salary divided by 2
    extra_salary = total_extra_hours * (base_salary / 160)  # Assuming 160 hours per month
    total_salary = base_salary + extra_salary

    # Create payroll record
    payroll = Payroll(
        fk_empleado=employee_id,
        fecha_inicio=start_date,
        fecha_fin=end_date,
        horas_trabajadas=total_hours,
        horas_extra=total_extra_hours,
        salario_base=base_salary,
        salario_extra=extra_salary,
        total=total_salary
    )
    db.add(payroll)
    db.commit()
    db.refresh(payroll)

    return payroll

@router.get("/generate/{employee_id}", response_model=PayrollSchema)
async def generate_payroll(employee_id: int, db: Session = Depends(get_db)):
    # Calculate date range (last 15 days)
    today = datetime.now()
    start_date = today - timedelta(days=15)
    end_date = today

    payroll = calculate_payroll(employee_id, start_date, end_date, db)
    return payroll

@router.get("/download/{employee_id}")
async def download_payroll(employee_id: int, db: Session = Depends(get_db)):
    # Get last payroll for employee
    payroll = db.query(Payroll).filter(
        Payroll.fk_empleado == employee_id
    ).order_by(Payroll.fecha_fin.desc()).first()

    if not payroll:
        raise HTTPException(status_code=404, detail="No payroll found")

    # Create DataFrame
    data = {
        "Concepto": [
            "Salario Base",
            "Horas Extra",
            "Total"
        ],
        "Importe": [
            f"${payroll.salario_base:.2f}",
            f"${payroll.salario_extra:.2f}",
            f"${payroll.total:.2f}"
        ]
    }
    
    df = pd.DataFrame(data)
    
    # Create Excel file
    excel_file = BytesIO()
    writer = pd.ExcelWriter(excel_file, engine='openpyxl')
    df.to_excel(writer, index=False, sheet_name='Nomina')
    writer.close()
    
    # Prepare for download
    excel_file.seek(0)
    encoded_file = base64.b64encode(excel_file.getvalue()).decode()
    
    return {"file": encoded_file, "filename": f"nomina_{employee_id}_{payroll.fecha_fin.strftime('%Y%m%d')}.xlsx"}

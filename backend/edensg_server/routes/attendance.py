from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from ..database import get_db
from ..models.attendance import Attendance
from ..schemas.attendance import AttendanceCreate, AttendanceUpdate, Attendance as AttendanceSchema

router = APIRouter()

@router.post("/attendance", response_model=AttendanceSchema)
def create_attendance(attendance: AttendanceCreate, db: Session = Depends(get_db)):
    db_attendance = Attendance(
        fk_empleado=attendance.fk_empleado,
        fecha=attendance.fecha,
        hora_entrada=attendance.hora_entrada
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance

@router.put("/attendance/{attendance_id}/exit", response_model=AttendanceSchema)
def mark_exit(attendance_id: int, exit_data: AttendanceUpdate, db: Session = Depends(get_db)):
    attendance = db.query(Attendance).filter(Attendance.id_asistencia == attendance_id).first()
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    
    attendance.hora_salida = exit_data.hora_salida
    attendance.calculate_hours()
    
    db.commit()
    db.refresh(attendance)
    return attendance

@router.get("/employees/{employee_id}/attendance", response_model=List[AttendanceSchema])
def get_employee_attendance(employee_id: int, db: Session = Depends(get_db)):
    attendance = db.query(Attendance).filter(Attendance.fk_empleado == employee_id).all()
    return attendance

@router.get("/teams/{team_id}/attendance", response_model=List[AttendanceSchema])
def get_team_attendance(team_id: int, db: Session = Depends(get_db)):
    # Get all employees in the team
    attendance = (
        db.query(Attendance)
        .join(Attendance.empleado)
        .filter(Attendance.empleado.has(fk_equipo=team_id))
        .all()
    )
    return attendance 
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Team, Employee
from ..schemas import Team as TeamSchema

router = APIRouter()

@router.get("/all", response_model=List[TeamSchema])
async def get_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    return teams

@router.post("/create", response_model=TeamSchema)
async def create_team(team: TeamSchema, db: Session = Depends(get_db)):
    db_team = Team(**team.dict())
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

@router.put("/update/{team_id}", response_model=TeamSchema)
async def update_team(team_id: int, team: TeamSchema, db: Session = Depends(get_db)):
    db_team = db.query(Team).filter(Team.id_equipo == team_id).first()
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    for key, value in team.dict().items():
        setattr(db_team, key, value)
    
    db.commit()
    db.refresh(db_team)
    return db_team

@router.delete("/remove-member/{team_id}/{member_id}")
async def remove_team_member(team_id: int, member_id: int, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id_equipo == team_id).first()
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Remove member from team
    team.empleados = [emp for emp in team.empleados if emp.id_empleado != member_id]
    
    db.commit()
    return {"message": "Team member removed successfully"}

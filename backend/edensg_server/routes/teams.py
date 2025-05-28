from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Team, Employee
from ..schemas import Team as TeamSchema
from ..repositories import team_repository

router = APIRouter(prefix="/teams")

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

@router.put("/update_members/{team_id}")
async def update_members(team_id: int, data: dict, db: Session = Depends(get_db)):
    """Actualiza los miembros de un equipo."""
    try:
        print(f"\n=== START update_members ===")
        print(f"Received data: {data}")
        
        if "empleados_ids" not in data:
            print("Missing empleados_ids field")
            raise HTTPException(status_code=400, detail="Missing empleados_ids")
        
        # Get the team first
        print(f"Looking for team with id: {team_id}")
        team = db.query(Team).filter(Team.id_equipo == team_id).first()
        if not team:
            print(f"Team not found with id: {team_id}")
            raise HTTPException(status_code=404, detail="Team not found")
        
        print(f"Found team: {team.id_equipo} - {team.nombre}")
        print(f"Current team members: {[emp.id_empleado for emp in team.empleados]}")
        
        # Get all current team members
        current_members = [emp.id_empleado for emp in team.empleados]
        
        # Verify if any member is being removed and is assigned to other teams
        print("Checking members to remove...")
        members_to_remove = set(current_members) - set(map(int, data["empleados_ids"]))
        
        if members_to_remove:
            other_teams = db.query(Team).filter(Team.id_equipo != team_id).all()
            for emp_id in members_to_remove:
                for other_team in other_teams:
                    if any(emp.id_empleado == emp_id for emp in other_team.empleados):
                        print(f"Employee {emp_id} is assigned to another team")
                        raise HTTPException(
                            status_code=400,
                            detail=f"No se puede eliminar el empleado {emp_id} porque está asignado a otro equipo"
                        )
        
        # Clear current members
        print("Clearing current team members")
        team.empleados = []
        
        # Process new members
        new_members = []
        invalid_ids = []
        
        for emp_id in data["empleados_ids"]:
            try:
                print(f"Processing employee ID: {emp_id}")
                emp_id_int = int(emp_id)
                emp = db.query(Employee).filter(Employee.id_empleado == emp_id_int).first()
                
                if emp:
                    print(f"Found employee: {emp.id_empleado} - {emp.nombre}")
                    new_members.append(emp)
                else:
                    print(f"Employee not found with ID: {emp_id_int}")
                    invalid_ids.append(emp_id_int)
            except (ValueError, TypeError) as e:
                print(f"Error processing ID {emp_id}: {str(e)}")
                invalid_ids.append(emp_id)
        
        # Update team members
        print(f"Adding {len(new_members)} valid members to team")
        team.empleados = new_members
        
        if invalid_ids:
            print(f"Invalid/missing employees: {invalid_ids}")
        
        # Commit changes
        print("Committing changes to database")
        db.commit()
        
        print(f"=== END update_members ===")
        return {"message": "Team members updated successfully",
                "details": {
                    "new_members": len(new_members),
                    "invalid_ids": invalid_ids
                }}
    except HTTPException as e:
        print(f"HTTP Exception: {str(e)}")
        raise
    except Exception as e:
        print(f"Unexpected Error: {str(e)}")
        print(f"Full error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/remove-member/{team_id}/{member_id}")
async def remove_team_member(team_id: int, member_id: int, db: Session = Depends(get_db)):
    """
    Elimina un miembro de un equipo.
    
    Args:
        team_id (int): ID del equipo
        member_id (int): ID del miembro a eliminar
        db (Session): Sesión de la base de datos
    
    Returns:
        dict: Mensaje de éxito
    """
    try:
        # Call repository method
        team_repository.remove_member(team_id, member_id)
        return {"message": "Team member removed successfully"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

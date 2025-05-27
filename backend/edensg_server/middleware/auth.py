from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
from ..config import settings
from ..database import get_db
from sqlalchemy.orm import Session
from ..models.empleado import Empleado

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

async def get_current_user(request: Request, db: Session = Depends(get_db)):
    try:
        token = request.cookies.get("access_token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            user_id: str = payload.get("sub")
            if user_id is None:
                raise HTTPException(status_code=401, detail="Invalid token")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Obtener el empleado de la base de datos
        empleado = db.query(Empleado).filter(Empleado.id_empleado == user_id).first()
        if not empleado:
            raise HTTPException(status_code=404, detail="Employee not found")
        
        # Devolver solo los datos necesarios para la autenticación
        return {
            "id": empleado.id_empleado,
            "rol": empleado.rol
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
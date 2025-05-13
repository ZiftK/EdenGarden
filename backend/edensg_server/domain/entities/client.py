from pydantic import BaseModel
from typing import Optional


class ClientToCreate(BaseModel):
    nombre: str
    direccion: str
    telefono: str
    email: Optional[str] = None

class Client(ClientToCreate):
    id_cliente: int

from pydantic import BaseModel
from typing import Optional


class Client(BaseModel):
    id_cliente: Optional[int] = None
    direccion: str
    telefono: str
    email: Optional[str] = None

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ContactMessageBase(BaseModel):
    name: str
    email: str
    phone: str
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: str
    created_at: datetime
    status: str
    read: bool

    class Config:
        from_attributes = True 
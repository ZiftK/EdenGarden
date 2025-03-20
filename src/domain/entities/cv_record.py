from pydantic import BaseModel
from enum import Enum

class CVStatus(Enum):
    Discarted = "discarted"
    Approved = "approved"
    PendingReview = "pending review"
    
class CVRecord(BaseModel):
    id: int
    status: CVStatus
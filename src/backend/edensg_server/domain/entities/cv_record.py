from pydantic import BaseModel
from enum import Enum


class CVStatus(Enum):
    Discarded = "discarded"
    Approved = "approved"
    PendingReview = "pending review"


class CVRecord(BaseModel):
    id: int
    status: CVStatus
    buffer: str

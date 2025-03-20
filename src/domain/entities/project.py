from pydantic import BaseModel
from team import Team
from project_calendar import ProjectCalendar

class Project(BaseModel):
    name: str
    teams: list[Team]
    calendar: ProjectCalendar
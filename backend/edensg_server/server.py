from fastapi import FastAPI
from pydantic import BaseModel
from adapters.api_rest.routers.team_paths import router as team_router
from adapters.api_rest.routers.project_paths import router as project_router
from adapters.api_rest.routers.employee_paths import router as employee_router
class Message(BaseModel):
    message: str


app = FastAPI()
app.include_router(team_router)
app.include_router(project_router)
app.include_router(employee_router)

@app.get('/')
def root():
    return {"prueba": "funciona"}

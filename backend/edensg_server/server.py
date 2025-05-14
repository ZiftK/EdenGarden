from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from adapters.api_rest.routers.team_paths import router as team_router
from adapters.api_rest.routers.project_paths import router as project_router
from adapters.api_rest.routers.employee_paths import router as employee_router
from adapters.api_rest.routers.client_paths import router as client_router
class Message(BaseModel):
    message: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], 
    allow_headers=["*"],  
    expose_headers=["*"], 
    max_age=600,
)


app.include_router(team_router)
app.include_router(project_router)
app.include_router(employee_router)
app.include_router(client_router)


@app.get('/')
def root():
    return {"prueba": "funciona"}

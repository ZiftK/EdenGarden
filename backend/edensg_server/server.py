from fastapi import FastAPI
from pydantic import BaseModel
from adapters.api_rest.routers.team_paths import router as team_router

class Message(BaseModel):
    message: str


app = FastAPI()
app.include_router(team_router)

@app.get('/')
def root():
    return {"prueba": "funciona"}

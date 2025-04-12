from fastapi import FastAPI
from backend.edensg_server.adapters.api_rest.routers.project_paths import projects_router
from backend.edensg_server.adapters.api_rest.routers.cv_paths import cv_router

app = FastAPI()
app.include_router(projects_router)
app.include_router(cv_router)

app.get("/", response_model=dict)
async def root():
    return {"message": "Hello World"}


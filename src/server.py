from fastapi import FastAPI

from pydantic import BaseModel

from routers.cv_paths import cv_router


class Message(BaseModel):
    message: str


app = FastAPI()
app.include_router(cv_router)


@app.get('/')
def root():
    return {"prueba": "funciona"}

from fastapi import APIRouter, UploadFile, File, HTTPException, Body
from pydantic import BaseModel


class Test(BaseModel):
    message: str


cv_router = APIRouter(prefix='/cv')


@cv_router.post('/send-cv')
async def save_cv(cv_file: UploadFile = File(...)):
    if cv_file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")

    content = await cv_file.read()
    path = __file__.split("\\")
    path = path[:-2]
    path = "/".join(path)

    with open(f"{path}/uploads/{cv_file.filename}", "wb") as f:
        print("escribiendo")
        f.write(content)

    return {
        "filename": cv_file.filename,
        "content_type": cv_file.content_type,
        "path": path
    }

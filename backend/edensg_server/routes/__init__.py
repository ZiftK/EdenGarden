from fastapi import APIRouter
from .auth import router as auth_router
from .empleados import router as empleados_router
from .equipos import router as equipos_router
from .proyectos import router as proyectos_router
from .contact import router as contact_router

router = APIRouter()

router.include_router(auth_router)
router.include_router(empleados_router)
router.include_router(equipos_router)
router.include_router(proyectos_router)
router.include_router(contact_router) 
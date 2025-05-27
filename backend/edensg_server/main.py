from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .middleware.loading import LoadingMiddleware
from .routes import auth
from .config import settings
from .database import engine, Base
from .models import empleado, equipo

# Crear las tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_CREDENTIALS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add loading middleware
app.add_middleware(LoadingMiddleware)

# Incluir las rutas de autenticación
app.include_router(auth.router, prefix="/auth", tags=["auth"])

# ... rest of your FastAPI setup ... 
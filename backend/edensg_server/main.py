from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .middleware.loading import LoadingMiddleware
from .routes import auth, attendance, employees, teams, projects, payroll
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

# Include routers
app.include_router(attendance.router, tags=["attendance"])
app.include_router(employees.router, tags=["employees"])
app.include_router(teams.router, tags=["teams"])
app.include_router(projects.router, tags=["projects"])
app.include_router(payroll.router, prefix="/payroll", tags=["payroll"])

# ... rest of your FastAPI setup ... 
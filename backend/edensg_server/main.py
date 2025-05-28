from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .middleware.loading import LoadingMiddleware
from .routes import auth, attendance, employees, teams, projects, payroll
from .config import settings
from .database import engine, Base
from .models import empleado, equipo
from .adapters.repository.supb.team_repository_sb import team_repository

# Crear las tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
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

# Initialize team repository
team_repository = team_repository
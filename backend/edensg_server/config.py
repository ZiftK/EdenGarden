from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    SECRET_KEY: str = "your-secret-key-here"  # Cambia esto en producción
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    CORS_ORIGINS: list = ["*"]  # Allow all origins
    CORS_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: list = ["*"]  # Allow all methods
    CORS_ALLOW_HEADERS: list = ["*"]  # Allow all headers

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings() 
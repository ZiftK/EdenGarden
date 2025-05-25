from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .middleware.loading import LoadingMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust according to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add loading middleware
app.add_middleware(LoadingMiddleware)

# ... rest of your FastAPI setup ... 
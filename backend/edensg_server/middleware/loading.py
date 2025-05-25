from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse

class LoadingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)

        # Si la respuesta es 102 (Processing), enviamos un header especial
        if hasattr(response, "status_code") and response.status_code == 102:
            # Convertimos la respuesta a JSONResponse si no lo es ya
            if not isinstance(response, JSONResponse):
                response = JSONResponse(
                    content={"isLoading": True, "message": "Processing request..."},
                    status_code=102
                )
            
            # Agregamos headers para CORS y control de cache
            response.headers["Access-Control-Expose-Headers"] = "X-Loading-State"
            response.headers["X-Loading-State"] = "true"
            response.headers["Cache-Control"] = "no-store"

        return response 
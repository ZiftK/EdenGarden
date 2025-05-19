from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
import requests
from io import BytesIO
import uuid

class ImageRepositorySupabase:
    def __init__(self):
        self.client: Client = supabase_client
        self.bucket_name = "employee_images"  # Bucket para imágenes de empleados

    async def upload_image_from_url(self, image_url: str, employee_id: int) -> str:
        try:
            # Descargar la imagen
            response = requests.get(image_url)
            image_data = BytesIO(response.content)

            # Generar nombre único para el archivo
            file_extension = image_url.split('.')[-1].split('?')[0]  # Manejar URLs con parámetros
            file_name = f"employee_{employee_id}_{uuid.uuid4()}.{file_extension}"

            # Subir a Supabase Storage
            result = self.client.storage.from_(self.bucket_name).upload(
                file_name,
                image_data.getvalue(),
                {"content-type": response.headers.get('content-type', 'image/jpeg')}
            )

            # Obtener la URL pública
            public_url = self.client.storage.from_(self.bucket_name).get_public_url(file_name)
            return public_url

        except Exception as e:
            raise Exception(f"Error al subir la imagen: {str(e)}")

    async def delete_image(self, file_name: str) -> bool:
        try:
            self.client.storage.from_(self.bucket_name).remove([file_name])
            return True
        except Exception as e:
            raise Exception(f"Error al eliminar la imagen: {str(e)}")

    async def update_employee_image(self, employee_id: int, image_url: str) -> str:
        try:
            # Primero, intentamos eliminar la imagen anterior si existe
            try:
                # Buscar la imagen anterior en el bucket
                files = self.client.storage.from_(self.bucket_name).list()
                for file in files:
                    if file['name'].startswith(f"employee_{employee_id}_"):
                        await self.delete_image(file['name'])
            except Exception:
                pass  # Si no hay imagen anterior, continuamos

            # Subir la nueva imagen
            return await self.upload_image_from_url(image_url, employee_id)
        except Exception as e:
            raise Exception(f"Error al actualizar la imagen del empleado: {str(e)}") 
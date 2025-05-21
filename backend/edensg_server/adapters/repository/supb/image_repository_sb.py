from supabase import Client
from backend.edensg_server.adapters.repository.supb.client import supabase_client
import uuid
import base64
from urllib.parse import urlparse

class ImageRepositorySupabase:
    def __init__(self):
        self.client: Client = supabase_client
        self.bucket = "images"  # Único bucket para todas las imágenes

    async def upload_image_from_url(self, image_url: str, entity_id: int, is_project: bool = False) -> str:
        try:
            prefix = "project" if is_project else "employee"
            
            # Obtener la extensión del archivo de la URL
            parsed_url = urlparse(image_url)
            file_extension = parsed_url.path.split('.')[-1].split('?')[0]
            
            # Generar nombre único para el archivo
            file_name = f"{prefix}_{entity_id}_{uuid.uuid4()}.{file_extension}"

            # Subir directamente la URL a Supabase Storage
            self.client.storage.from_(self.bucket).upload(
                file_name,
                image_url,
                {"content-type": f"image/{file_extension}"}
            )

            # Obtener la URL pública
            public_url = self.client.storage.from_(self.bucket).get_public_url(file_name)
            return public_url

        except Exception as e:
            raise Exception(f"Error al subir la imagen: {str(e)}")

    async def delete_image(self, file_name: str, is_project: bool = False) -> bool:
        try:
            self.client.storage.from_(self.bucket).remove([file_name])
            return True
        except Exception as e:
            raise Exception(f"Error al eliminar la imagen: {str(e)}")

    async def update_entity_image(self, entity_id: int, image_url: str, is_project: bool = False) -> str:
        try:
            prefix = "project" if is_project else "employee"
            
            # Primero, intentamos eliminar la imagen anterior si existe
            try:
                # Buscar la imagen anterior en el bucket
                files = self.client.storage.from_(self.bucket).list()
                for file in files:
                    if file['name'].startswith(f"{prefix}_{entity_id}_"):
                        await self.delete_image(file['name'], is_project)
            except Exception:
                pass  # Si no hay imagen anterior, continuamos

            # Si la imagen es base64, usar upload_base64_image
            if image_url.startswith('data:image/'):
                return await self.upload_base64_image(image_url, entity_id, is_project)
            
            # Si no es base64, subir desde URL
            return await self.upload_image_from_url(image_url, entity_id, is_project)
            
        except Exception as e:
            raise Exception(f"Error al actualizar la imagen: {str(e)}")

    async def upload_base64_image(self, base64_image: str, entity_id: int, is_project: bool = False) -> str:
        try:
            prefix = "project" if is_project else "employee"
            
            # Validar que la imagen es base64 válida
            if not base64_image or not isinstance(base64_image, str):
                raise ValueError("La imagen base64 es inválida")

            # Extraer la parte de datos del base64
            try:
                if ',' in base64_image:
                    # Formato: data:image/jpeg;base64,/9j/4AAQSkZJRg...
                    header, encoded = base64_image.split(',', 1)
                    content_type = header.split(';')[0].split(':')[1]
                else:
                    # Formato: /9j/4AAQSkZJRg...
                    encoded = base64_image
                    content_type = 'image/jpeg'  # Default
            except Exception as e:
                raise ValueError(f"Error al procesar la imagen base64: {str(e)}")

            # Decodificar la imagen
            try:
                image_data = base64.b64decode(encoded)
            except Exception as e:
                raise ValueError(f"Error al decodificar la imagen base64: {str(e)}")

            # Determinar la extensión del archivo
            if 'jpeg' in content_type or 'jpg' in content_type:
                file_extension = 'jpg'
            elif 'png' in content_type:
                file_extension = 'png'
            else:
                raise ValueError(f"Tipo de imagen no soportado: {content_type}")

            # Generar nombre único para el archivo
            file_name = f"{prefix}_{entity_id}_{uuid.uuid4()}.{file_extension}"

            try:
                # Subir a Supabase Storage
                self.client.storage.from_(self.bucket).upload(
                    file_name,
                    image_data,
                    {"content-type": content_type}
                )

                # Obtener la URL pública
                public_url = self.client.storage.from_(self.bucket).get_public_url(file_name)
                return public_url
            except Exception as e:
                raise Exception(f"Error al subir la imagen a Supabase: {str(e)}")

        except ValueError as e:
            raise Exception(str(e))
        except Exception as e:
            raise Exception(f"Error al procesar la imagen: {str(e)}")
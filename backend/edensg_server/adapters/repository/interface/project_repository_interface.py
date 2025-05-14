from abc import ABC
from backend.edensg_server.domain.entities.project import Project


class ProjectRepository(ABC):

    async def create_project(self, data: Project) -> int:
        """Inserta un nuevo proyecto en la base de datos."""

    async def get_all_projects(self, id: int) -> list[Project]:
        """Busca proyectos por un campo específico."""
        
    async def find_all_projects(self) -> list[Project]:
        """Busca todos los proyectos en la base de datos."""

    async def update_project_data(self, id: int, data: Project) -> None:
        """Actualiza la información de un proyecto."""

    async def drop_project_data(self, id: int) -> None:
        """Elimina un proyecto de la base de datos."""

from backend.edensg_server.adapters.repository.cv_record_repository_interface import CVRecordRepository
from backend.edensg_server.domain.entities.cv_record import CVRecord
from typing import Optional

class ViewCVUseCase:
    def __init__(self, cv_repository: CVRecordRepository):
        self.cv_repository = cv_repository

    async def execute(self, cv_id: int) -> CVRecord:
        """
        Devuelve un CV individual por su ID.
        Args:
            cv_id: ID del CV
        Raises:
            ValueError: Si el CV no existe
        Returns:
            CVRecord: El CV encontrado
        """
        cvs = await self.cv_repository.find_cv_records(str(cv_id), search_by="id")
        if not cvs:
            raise ValueError(f"El CV con ID {cv_id} no existe.")
        return cvs[0] 
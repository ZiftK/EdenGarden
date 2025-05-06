from backend.edensg_server.adapters.repository.cv_record_repository_interface import CVRecordRepository
from backend.edensg_server.domain.entities.cv_record import CVRecord
from typing import List

class ViewCVsUseCase:
    def __init__(self, cv_repository: CVRecordRepository):
        self.cv_repository = cv_repository

    async def execute(self) -> List[CVRecord]:
        """
        Devuelve la lista de todos los CV's registrados.
        Returns:
            List[CVRecord]: Lista de CV's
        """
        cvs = await self.cv_repository.find_cv_records("all", search_by="all")
        return cvs 
from backend.edensg_server.adapters.repository.cv_record_repository_interface import CVRecordRepository
from backend.edensg_server.domain.entities.cv_record import CVRecord, CVStatus
from typing import List

class FilterCVsUseCase:
    def __init__(self, cv_repository: CVRecordRepository):
        self.cv_repository = cv_repository

    async def execute(self, reviewed: bool) -> List[CVRecord]:
        """
        Filtra entre CV's revisados y no revisados.
        Args:
            reviewed: True para obtener revisados, False para no revisados
        Returns:
            List[CVRecord]: Lista de CV's filtrados
        """
        if reviewed:
            status = CVStatus.Approved
        else:
            status = CVStatus.PendingReview
        cvs = await self.cv_repository.find_cv_records(status.value, search_by="status")
        return cvs 
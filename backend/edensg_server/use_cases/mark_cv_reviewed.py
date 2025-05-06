from backend.edensg_server.adapters.repository.cv_record_repository_interface import CVRecordRepository
from backend.edensg_server.domain.entities.cv_record import CVStatus

class MarkCVReviewedUseCase:
    def __init__(self, cv_repository: CVRecordRepository):
        self.cv_repository = cv_repository

    async def execute(self, cv_id: int) -> None:
        """
        Marca un CV individual como revisado (Approved).
        Args:
            cv_id: ID del CV
        Raises:
            ValueError: Si el CV no existe
        """
        cvs = await self.cv_repository.find_cv_records(str(cv_id), search_by="id")
        if not cvs:
            raise ValueError(f"El CV con ID {cv_id} no existe.")
        await self.cv_repository.update_cv_record_status(cv_id, CVStatus.Approved) 
from backend.edensg_server.adapters.repository.cv_record_repository_interface import CVRecordRepository
from backend.edensg_server.domain.entities.cv_record import CVRecord, CVStatus

class ReceiveCVUseCase:
    def __init__(self, cv_repository: CVRecordRepository):
        self.cv_repository = cv_repository

    async def execute(self, buffer: str) -> int:
        """
        Recibe un CV de prospecto y lo guarda con estado 'pending review'.
        Args:
            buffer: Contenido del CV (por ejemplo, base64, texto, etc.)
        Returns:
            int: ID del CV registrado
        """
        cv = CVRecord(id=0, status=CVStatus.PendingReview, buffer=buffer)
        cv_id = await self.cv_repository.create_cv_record(cv)
        return cv_id 
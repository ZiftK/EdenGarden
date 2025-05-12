from backend.edensg_server.adapters.repository.cv_record_repository_interface import CVRecordRepository
from backend.edensg_server.domain.entities.cv_record import CVRecord, CVStatus
from typing import List

class CVsUseCases:
    def __init__(self, cv_repository: CVRecordRepository):
        self.cv_repository = cv_repository

    async def view_all_cvs(self) -> List[CVRecord]:
        """
        Devuelve la lista de todos los CV's registrados.
        Returns:
            List[CVRecord]: Lista de CV's
        """
        cvs = await self.cv_repository.find_cv_records("all", search_by="all")
        return cvs

    async def view_cv(self, cv_id: int) -> CVRecord:
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

    async def filter_cvs(self, reviewed: bool) -> List[CVRecord]:
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

    async def receive_cv(self, buffer: str) -> int:
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

    async def mark_cv_reviewed(self, cv_id: int) -> None:
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
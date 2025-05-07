from abc import ABC
from backend.edensg_server.domain.entities.cv_record import CVRecord, CVStatus


class CVRecordRepository(ABC):

    async def create_cv_record(self, data: CVRecord) -> int:
        """Inserta un nuevo CV de prospecto en la base de datos."""

    async def find_cv_records(self, identifier: str, search_by: str) -> list[CVRecord]:
        """Busca registros de CV por un campo específico."""

    async def update_cv_record_status(self, id: int, status: CVStatus) -> None:
        """Actualiza el estado de un CV de prospecto."""

    async def drop_cv_record(self, id: int) -> None:
        """Elimina un CV de prospecto de la base de datos."""

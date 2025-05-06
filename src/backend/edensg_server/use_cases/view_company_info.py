# NOTA: Este caso de uso asume la existencia de una nueva entidad CompanyInfo y su repositorio correspondiente.
from backend.edensg_server.domain.entities.company_info import CompanyInfo
from backend.edensg_server.adapters.repository.company_info_repository_interface import CompanyInfoRepository

class ViewCompanyInfoUseCase:
    def __init__(self, company_info_repository: CompanyInfoRepository):
        self.company_info_repository = company_info_repository

    async def execute(self) -> CompanyInfo:
        """
        Devuelve la información de la empresa.
        Returns:
            CompanyInfo: Información de la empresa
        Raises:
            ValueError: Si no existe información de la empresa
        """
        info = await self.company_info_repository.get_company_info()
        if not info:
            raise ValueError("No existe información de la empresa.")
        return info 
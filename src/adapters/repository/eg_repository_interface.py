from abc import ABC
from enum import Enum
from domain.employee import Employee
from domain.team import Team
from domain.project import Project


class BaseFields(Enum): 
    Id = "id"
    Name = "Name"

class FindEmployeeFields(Enum):
    Project = "project"
    Team = "team"
    Role = "role"

class FindTeamFields(Enum):
    Project = "project"



class Repository(ABC):

    
    async def create_employee(data: Employee)->int:
        """
        Inserta un nuevo empleado en la base de datos.
        :param id: Id para el nuevo empleado.
        :param data: Información del nuevo empleado

        :returns:
        Id de empleado asignado en la base de datos.
        """

    async def create_team(data: Team)->int:
        """
        Inserta un nuevo equipo en la base de datos.
        :param id: Id para el nuevo equipo.
        :param data: Información del nuevo equipo

        :returns:
        Id de equipo asignado en la base de datos.
        """

    async def create_project(data: Project)->int:
        """
        Inserta un nuevo proyecto en la base de datos.
        :param id: Id para el nuevo proyecto.
        :param data: Información del nuevo proyecto

        :returns:
        Id de proyecto asignado en la base de datos.
        """
    
    async def find_employees(identifier: str, search_by: BaseFields | FindEmployeeFields = BaseFields.Id)-> list[Employee]:
        """
        :param identifier: Parámetro de comparación.
        :param search_by: Establece sobre que campo se quiere hacer la comparación para la búsqueda.

        :returns: 
        Lista de empleados cuyo campo 'search_by' sea igual a 'identifier'.
        """

    async def find_teams(identifier: str, search_by: BaseFields | FindTeamFields = BaseFields.Id)-> list[Team]:
        """
        :param identifier: Parámetro de comparación.
        :param search_by: Establece sobre que campo se quiere hacer la comparación para la búsqueda.

        :returns: 
        Lista de equipos cuyo campo 'search_by' sea igual a 'identifier'.
        """

    async def find_projects(identifier: str, search_by: BaseFields = BaseFields.Id)-> list[Project]:
        """
        :param identifier: Parámetro de comparación.
        :param search_by: Establece sobre que campo se quiere hacer la comparación para la búsqueda.

        :returns: 
        Lista de proyectos cuyo campo 'search_by' sea igual a 'identifier'.
        """

    async def update_employee_data(id: str, data: Employee)-> None:
        """
        Sobre escribe datos de empleado.

        :param identifier: Parámetro de comparación.
        :param search_by: Establece sobre que campo se quiere hacer la comparación para la modificación.
        """

    async def update_team_data(id: str, data: Team)-> None:
        """
        Sobre escribe datos del equpo.

        :param identifier: Parámetro de comparación.
        :param search_by: Establece sobre que campo se quiere hacer la comparación para la modificación.
        """

    async def update_project_data(id: int, data: Project)-> None:
        """
        Sobre escribe datos del equpo.

        :param identifier: Parámetro de comparación.
        :param search_by: Establece sobre que campo se quiere hacer la comparación para la modificación.
        """

    async def drop_employee_data(id: int)->None:
        """
        Elimina un empleado de la base de datos.
        :param id: identificador de empleado.
        """

    async def drop_team_data(id: int)->None:
        """
        Elimina un equipo de la base de datos.
        :param id: identificador del equipo.
        """

    async def drop_project_data(id: int)->None:
        """
        Elimina un proyecto de la base de datos.
        :param id: identificador del proyect.
        """


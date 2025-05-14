from backend.edensg_server.adapters.repository.interface.team_repository_interface import TeamRepository
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.team import Team, TeamToCreate
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository, EmployeeRepositorySB
from supabase import Client
from backend.edensg_server.adapters.repository.supb.formatter_from_db import format_team, format_employee

class TeamRepositorySB(TeamRepository):
    def __init__(self):
        self.client: Client = supabase_client
        self.employee_repo: EmployeeRepositorySB = employee_sb_repository
        self.table = 'equipo'
        self.employee_table = 'empleado'

    def create_team(self, team: TeamToCreate) -> int:
        """Inserta un nuevo equipo en la base de datos."""
        data_dict = team.model_dump(exclude={'empleados'})
        data_dict['fk_lider'] = data_dict.pop('lider')
        response = self.client.table(self.table).insert(data_dict).execute()
        return response.data[0]['id_equipo']
    
    def register_team_employees(self, id: int, employee_ids: list[int]) -> None:
        """Registra los empleados de un equipo en la base de datos."""
        self.client.table(self.employee_table).update({'fk_equipo': id}).in_('id_empleado', employee_ids).execute()

    def unregister_team_employees(self, id: int, employee_ids: list[int]) -> None:
        """Elimina los empleados de un equipo en la base de datos."""
        self.client.table(self.employee_table).update({'fk_equipo': None}).in_('id_empleado', employee_ids).execute()
    
    def get_all_teams(self) -> list[Team]:
        """Obtiene todos los equipos de la base de datos."""
        response = self.client.table(self.table).select('*').execute()
        teams = []
        for team_data in response.data:
            # Get leader data
            leader = self.employee_repo.find_employee_by_id(team_data['fk_lider'])
            # Get team employees
            employees = self.client.table(self.employee_table).select('*').eq('fk_equipo', team_data['id_equipo']).execute().data
            employees = [format_employee(employee) for employee in employees]
            
            # Remove fk_lider from data
            team_data.pop('fk_lider')
            # Create team with complete data
            teams.append(Team(**{**team_data, 'lider': leader, 'empleados': employees}))
        return teams
    
    def check_employee_is_in_other_teams(self, ids: list[int]) -> list[int]:
        """Verifica si los empleados están en otros equipos y devuelve las IDs de los que sí lo están."""
        result = []
        for employee_id in ids:
            response = self.client.table(self.employee_table).select('id_empleado, fk_equipo').eq('id_empleado', employee_id).execute()
            if response.data and response.data[0].get('fk_equipo') is not None:
                result.append(employee_id)
        return result
    
    def check_team_exists(self, id: int) -> bool:
        """Verifica si un equipo existe en la base de datos."""
        response = self.client.table(self.table).select('*').eq('id_equipo', id).execute()
        return bool(response.data)
    
    def check_employee_exists(self, ids: list[int]) -> list[int]:
        """Verifica si los empleados existen en la base de datos y devuelve las IDs que no existen."""
        response = self.client.table(self.employee_table).select('id_empleado').in_('id_empleado', ids).execute()
        existing_ids = [employee['id_empleado'] for employee in response.data]
        return [id for id in ids if id not in existing_ids]
    
    def find_team_where_employee_is_leader(self, ids: list[int]) -> list[dict]:
        """Busca equipos por id del lider."""
        response = self.client.table(self.table).select('id_equipo, nombre, fk_lider(id_empleado, nombre)').in_('fk_lider', ids).execute()
        return response.data

    def find_team_by_id(self, id: int) -> Team:
        """Busca equipos por id."""
        response = self.client.table(self.table).select('*').eq('id_equipo', id).execute()
        if not response.data:
            raise Exception(f"El equipo con id {id} no existe")
        
        # Get team employees data
        data = response.data[0]

        leader = self.employee_repo.find_employee_by_id(data['fk_lider'])
        employees = self.client.table(self.employee_table).select('*').eq('fk_equipo', id).execute().data
        employees = [format_employee(employee) for employee in employees]
        data.pop('fk_lider')

        return Team(**{**data, 'lider': leader, 'empleados': employees})
    
    def find_team_by_name(self, name: str) -> list[Team]:
        """Busca equipos por nombre."""
        response = self.client.table(self.table).select('*').ilike('nombre', f'%{name}%').execute()
        response = response.data
        
        teams: list[Team] = []
        for team in response:
            leader = self.employee_repo.find_employee_by_id(team['fk_lider'])
            employees = self.client.table(self.employee_table).select('*').eq('fk_equipo', team['id_equipo']).execute().data
            employees = [format_employee(employee) for employee in employees]

            team.pop('fk_lider')
            
            teams.append(Team(**{**team, 'lider': leader, 'empleados': employees}))
        return teams

    def update_team_name(self, id: int, new_name: str) -> None:
        """Actualiza el nombre de un equipo."""
        self.client.table(self.table).update({'nombre': new_name}).eq('id_equipo', id).execute()

    def update_team_leader(self, id: int, new_leader_id: int) -> None:
        """Actualiza el líder de un equipo."""
        self.client.table(self.table).update({'fk_lider': new_leader_id}).eq('id_equipo', id).execute()

    def update_team_data(self, id: int, data: Team) -> None:
        """Actualiza la información de un equipo."""
        # Solo actualizamos nombre y fk_lider
        update_data = {
            'nombre': data.nombre,
            'fk_lider': data.lider
        }
        self.client.table(self.table).update(update_data).eq('id_equipo', id).execute()

    def delete_team_data(self, id: int) -> None:
        """Elimina un equipo de la base de datos."""
        self.client.table(self.table).delete().eq('id_equipo', id).execute()

repository_sb = TeamRepositorySB()

def main():
    repo = TeamRepositorySB()
    teams = repo.find_team_by_name('Equipo Verde')
    print(teams)

if __name__ == "__main__":
    main()

team_sb_repository = TeamRepositorySB()
from backend.edensg_server.adapters.repository.interface.team_repository_interface import TeamRepository
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.team import Team
from backend.edensg_server.domain.entities.employee import Employee
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository, EmployeeRepository
from supabase import Client


class TeamRepositorySB(TeamRepository):
    def __init__(self):
        self.client: Client = supabase_client
        self.employee_repo: EmployeeRepository = employee_sb_repository
        self.table = 'equipo'
        self.equipoempleado_table = 'equipoempleado'

    def __get_team_employees(self, id: int) -> list[Employee]:
        """Obtiene los empleados de un equipo."""
        employee_ids: list[int] = [employee['fk_empleado'] for employee in self.client.table(self.equipoempleado_table).select('fk_empleado').eq('fk_equipo', id).execute().data]
        return self.employee_repo.find_employees_by_ids(employee_ids)

    def create_team(self, team: Team) -> int:
        """Inserta un nuevo equipo en la base de datos."""
        data_dict = team.model_dump(exclude={'id_equipo'})
        response = self.client.table(self.table).insert(data_dict).execute()
        return response.data[0]['id_equipo']
    
    def get_all_teams(self) -> list[Team]:
        """Obtiene todos los equipos de la base de datos."""
        response = self.client.table(self.table).select('*').execute()
        return [Team(**team) for team in response.data]
    
    def find_team_by_id(self, id: int) -> Team:
        """Busca equipos por id."""
        response = self.client.table(self.table).select('*').eq('id_equipo', id).execute()

        # Get team employees data
        data = response.data[0]
        # We get the leader of the team using the employee repository that implements the supabase client
        leader: Employee = self.employee_repo.find_employee_by_id(data['fk_lider'])
        
        # We get the employees of the team using the employee repository that implements the supabase client
        employees: list[Employee] = self.__get_team_employees(data['id_equipo'])
        
        data.pop('fk_lider')

        team = Team(
            **{**data, 'lider': leader, 'empleados': employees}
        )
        return team
    
    def find_team_by_name(self, name: str) -> list[Team]:
        """Busca equipos por nombre."""
        response = self.client.table(self.table).select('*').ilike('nombre', f'%{name}%').execute()
        response = response.data

        teams: list[Team] = []
        for team in response:
            leader = self.employee_repo.find_employee_by_id(team['fk_lider'])
            employees = self.__get_team_employees(team['id_equipo'])

            team.pop('fk_lider')

            teams.append(Team(
                **{**team, 'lider': leader, 'empleados': employees}
            ))
        return teams
    
    def update_team_data(self, id: int, data: Team) -> None:
        """Actualiza la información de un equipo."""
        self.client.table(self.table).update(data.model_dump(exclude={'id_equipo'})).eq('id_equipo', id).execute()

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

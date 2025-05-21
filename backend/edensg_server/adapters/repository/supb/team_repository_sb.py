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
        self.employee_base_table = 'empleado'

    def create_team(self, data: TeamToCreate) -> int:
        """Inserta un nuevo equipo en la base de datos."""
        team_data = {
            'nombre': data.nombre,
            'fk_lider': data.lider_id
        }
        
        # Create team
        response = self.client.table(self.table).insert(team_data).execute()
        team_id = response.data[0]['id_equipo']
        
        # Register employees if any
        if data.empleados_ids:
            for emp_id in data.empleados_ids:
                self.client.table(self.employee_base_table).update({
                    'fk_equipo': team_id
                }).eq('id_empleado', emp_id).execute()
        
        return team_id
    
    def register_team_employees(self, id: int, employee_ids: list[int]) -> None:
        """Registra los empleados de un equipo en la base de datos."""
        for emp_id in employee_ids:
            self.client.table(self.employee_base_table).update({'fk_equipo': id}).eq('id_empleado', emp_id).execute()

    def unregister_team_employees(self, id: int, employee_ids: list[int]) -> None:
        """Elimina los empleados de un equipo en la base de datos."""
        for emp_id in employee_ids:
            self.client.table(self.employee_base_table).update({'fk_equipo': None}).eq('id_empleado', emp_id).execute()
    
    def get_all_teams(self) -> list[Team]:
        """Obtiene todos los equipos de la base de datos."""
        try:
            response = self.client.table(self.table).select('*').execute()
            teams = []
            for team_data in response.data:
                try:
                    # Get leader data
                    leader = self.employee_repo.find_employee_by_id(team_data['fk_lider'])
                    
                    # Get team employees
                    employees_response = self.client.table(self.employee_base_table).select('*').eq('fk_equipo', team_data['id_equipo']).execute()
                    employees = []
                    for emp_data in employees_response.data:
                        try:
                            emp = format_employee(emp_data)
                            employees.append(emp)
                        except Exception as e:
                            print(f"Error formatting employee: {str(e)}")
                            continue
                    
                    # Map field names to match our model
                    mapped_data = {
                        'id_equipo': team_data['id_equipo'],
                        'nombre': team_data['nombre'],
                        'lider': leader,
                        'empleados': employees
                    }
                    teams.append(Team(**mapped_data))
                except Exception as e:
                    print(f"Error processing team {team_data.get('id_equipo')}: {str(e)}")
                    continue
            return teams
        except Exception as e:
            raise Exception(f"Error getting teams: {str(e)}")
    
    def check_employee_is_in_other_teams(self, ids: list[int]) -> list[int]:
        """Verifica si los empleados están en otros equipos y devuelve las IDs de los que sí lo están."""
        result = []
        for employee_id in ids:
            response = self.client.table(self.employee_base_table).select('id_empleado').eq('id_empleado', employee_id).is_('fk_equipo', 'not.null').execute()
            if response.data:
                result.append(employee_id)
        return result
    
    def check_team_exists(self, id: int) -> bool:
        """Verifica si un equipo existe en la base de datos."""
        response = self.client.table(self.table).select('*').eq('id_equipo', id).execute()
        return bool(response.data)
    
    def check_employee_exists(self, ids: list[int]) -> list[int]:
        """Verifica si los empleados existen en la base de datos y devuelve las IDs que no existen."""
        response = self.client.table(self.employee_base_table).select('id_empleado').in_('id_empleado', ids).execute()
        existing_ids = [employee['id_empleado'] for employee in response.data]
        return [id for id in ids if id not in existing_ids]
    
    def find_team_where_employee_is_leader(self, ids: list[int]) -> list[dict]:
        """Busca equipos por id del lider."""
        response = self.client.table(self.table).select('id_equipo, nombre, fk_lider').in_('fk_lider', ids).execute()
        return response.data

    def find_team_by_id(self, id: int) -> Team:
        """Busca equipos por id."""
        response = self.client.table(self.table).select('*').eq('id_equipo', id).execute()
        if not response.data:
            raise Exception(f"El equipo con id {id} no existe")
        
        # Get team data
        data = response.data[0]
        leader = self.employee_repo.find_employee_by_id(data['fk_lider'])
        
        # Get team employees
        employees_response = self.client.table(self.employee_base_table).select('*').eq('fk_equipo', id).execute()
        employees = []
        for emp_data in employees_response.data:
            try:
                emp = format_employee(emp_data)
                employees.append(emp)
            except Exception:
                continue

        # Map field names to match our model
        mapped_data = {
            'id_equipo': data['id_equipo'],
            'nombre': data['nombre'],
            'lider': leader,
            'empleados': employees
        }
        return Team(**mapped_data)
    
    def find_team_by_name(self, name: str) -> list[Team]:
        """Busca equipos por nombre."""
        response = self.client.table(self.table).select('*').ilike('nombre', f'%{name}%').execute()
        teams = []
        for team_data in response.data:
            # Get leader data
            leader = self.employee_repo.find_employee_by_id(team_data['fk_lider'])
            
            # Get team employees
            employees_response = self.client.table(self.employee_base_table).select('*').eq('fk_equipo', team_data['id_equipo']).execute()
            employees = []
            for emp_data in employees_response.data:
                try:
                    emp = format_employee(emp_data)
                    employees.append(emp)
                except Exception:
                    continue
            
            # Map field names to match our model
            mapped_data = {
                'id_equipo': team_data['id_equipo'],
                'nombre': team_data['nombre'],
                'lider': leader,
                'empleados': employees
            }
            teams.append(Team(**mapped_data))
        return teams

    def update_team_name(self, id: int, new_name: str) -> None:
        """Actualiza el nombre de un equipo."""
        self.client.table(self.table).update({'nombre': new_name}).eq('id_equipo', id).execute()

    def update_team_leader(self, id: int, new_leader_id: int) -> None:
        """Actualiza el líder de un equipo."""
        self.client.table(self.table).update({'fk_lider': new_leader_id}).eq('id_equipo', id).execute()

    def update_team_data(self, id: int, data: Team) -> None:
        """Actualiza la información de un equipo."""
        update_data = {
            'nombre': data.nombre,
            'fk_lider': data.lider.id_empleado
        }
        self.client.table(self.table).update(update_data).eq('id_equipo', id).execute()

    def delete_team_data(self, id: int) -> None:
        """Elimina un equipo de la base de datos."""
        # First remove all employee associations
        self.client.table(self.employee_base_table).update({'fk_equipo': None}).eq('fk_equipo', id).execute()
        # Then delete the team
        self.client.table(self.table).delete().eq('id_equipo', id).execute()

repository_sb = TeamRepositorySB()

def main():
    repo = TeamRepositorySB()
    teams = repo.find_team_by_name('Equipo Verde')
    print(teams)

if __name__ == "__main__":
    main()

team_sb_repository = TeamRepositorySB()
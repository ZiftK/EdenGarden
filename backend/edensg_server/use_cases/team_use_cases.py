from backend.edensg_server.adapters.repository.supb.team_repository_sb import team_sb_repository as team_repository
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository
from backend.edensg_server.domain.entities.team import Team

class TeamController:
    def __init__(self):
        self.team_repository = team_repository
        self.employee_repo = employee_sb_repository
        
    def get_all_teams(self) -> list[Team]:
        return self.team_repository.get_all_teams()
    
    def get_team_by_id(self, id: int) -> Team:
        return self.team_repository.find_team_by_id(id)
    
    def get_team_by_name(self, name: str) -> Team:
        return self.team_repository.find_team_by_name(name)
    
    def create_team(self, team: Team) -> Team:
        # Verificar que el líder existe
        try:
            self.employee_repo.find_employee_by_id(team.lider)
        except Exception as e:
            raise Exception(f"El empleado con ID {team.lider} no existe y no puede ser líder del equipo")

        # Verificar que el líder no es líder de otro equipo
        teams_where_leader = self.team_repository.find_team_where_employee_is_leader([team.lider])
        if teams_where_leader:
            raise Exception(f"El empleado con ID {team.lider} ya es líder de otro equipo")

        # Verificar que el líder no pertenece a otro equipo
        leader_employee = self.employee_repo.find_employee_by_id(team.lider)
        if leader_employee.equipo is not None:
            raise Exception(f"El empleado con ID {team.lider} ya pertenece a otro equipo")

        # Verificar que los empleados existen y no pertenecen a otros equipos
        if team.empleados:
            # Verificar que los empleados existen
            non_existent_employees = self.team_repository.check_employee_exists(team.empleados)
            if non_existent_employees:
                raise Exception(f"Los siguientes empleados no existen: {', '.join(map(str, non_existent_employees))}")

            # Verificar que los empleados no son líderes de otros equipos
            teams_where_employees_are_leaders = self.team_repository.find_team_where_employee_is_leader(team.empleados)
            if teams_where_employees_are_leaders:
                leader_ids = [team['fk_lider']['id_empleado'] for team in teams_where_employees_are_leaders]
                raise Exception(f"Los siguientes empleados son líderes de otros equipos: {', '.join(map(str, leader_ids))}")

            # Verificar que los empleados no pertenecen a otros equipos
            employees_in_other_teams = []
            for emp_id in team.empleados:
                employee = self.employee_repo.find_employee_by_id(emp_id)
                if employee.equipo is not None:
                    employees_in_other_teams.append(emp_id)
            
            if employees_in_other_teams:
                raise Exception(f"Los siguientes empleados ya pertenecen a otros equipos: {', '.join(map(str, employees_in_other_teams))}")

        # Crear el equipo
        team_id = self.team_repository.create_team(team)
        
        # Registrar los empleados si se proporcionaron
        if team.empleados:
            self.team_repository.register_team_employees(team_id, team.empleados)
        
        return {
            'message': 'Equipo creado correctamente',
            'team_id': team_id
        }
    
    def update_team(self, id: int, team: Team) -> Team:
        response = self.team_repository.update_team_data(id, team)
        if response:
            return {"message": "Equipo actualizado correctamente"}
        else:
            raise Exception(response)
    
    def delete_team(self, id: int) -> None:
        response = self.team_repository.delete_team_data(id)
        if response:
            return {"message": "Equipo eliminado correctamente"}
        else:
            raise Exception("Equipo no encontrado")

    def register_team_employees(self, id: int, employee_ids: list[int]) -> None:
        team_exists = self.team_repository.check_team_exists(id)
        if not team_exists:
            raise Exception(f"El equipo con id {id} no existe")
        
        non_existent_employees = self.team_repository.check_employee_exists(employee_ids)
        if non_existent_employees:
            raise Exception(f"Los siguientes empleados no existen: {', '.join(map(str, non_existent_employees))}")
        
        teams_where_employee_is_leader = self.team_repository.find_team_where_employee_is_leader(employee_ids)
        leaders_in_other_teams = []
        this_team_leader = None
        for team in teams_where_employee_is_leader:
            employee_id = team.get('fk_lider').get('id_empleado')

            if team.get('id_equipo') == id:
                this_team_leader = team.get('fk_lider').get('id_empleado')
                break

            if employee_id in employee_ids:
                leaders_in_other_teams.append(employee_id)
                continue


        if this_team_leader:
            raise Exception(f"El empleado con id {this_team_leader} ya pertenece a este equipo como lider")
                
        if leaders_in_other_teams:
            raise Exception(f"Los siguientes empleados son lideres de otros equipos: {', '.join(map(str, leaders_in_other_teams))}")
        
        return self.team_repository.register_team_employees(id, employee_ids)

    def unregister_team_employees(self, id: int, employee_ids: list[int]) -> None:
        # Primero verificamos que el equipo exista
        team = self.team_repository.find_team_by_id(id)
        
        # Verificamos que los empleados existan
        non_existent_employees = self.team_repository.check_employee_exists(employee_ids)
        if non_existent_employees:
            raise Exception(f"Los siguientes empleados no existen: {', '.join(map(str, non_existent_employees))}")
        
        # Verificamos que los empleados pertenezcan al equipo
        team_employees = [emp.id_empleado for emp in team.empleados]
        employees_not_in_team = [emp_id for emp_id in employee_ids if emp_id not in team_employees]
        if employees_not_in_team:
            raise Exception(f"Los siguientes empleados no pertenecen a este equipo: {', '.join(map(str, employees_not_in_team))}")
        
        # Verificamos que ninguno de los empleados sea el líder
        if team.lider.id_empleado in employee_ids:
            raise Exception(f"El empleado con id {team.lider.id_empleado} es el líder del equipo y no puede ser removido")
        
        return self.team_repository.unregister_team_employees(id, employee_ids)

    def update_team_name(self, id: int, new_name: str) -> dict:
        """Actualiza el nombre de un equipo."""
        # Verificar que el equipo existe
        if not self.team_repository.check_team_exists(id):
            raise Exception(f"El equipo con id {id} no existe")
        
        self.team_repository.update_team_name(id, new_name)
        return {"message": "Nombre del equipo actualizado correctamente"}

    def update_team_leader(self, id: int, new_leader_id: int) -> dict:
        """Actualiza el líder de un equipo."""
        # Verificar que el equipo existe
        if not self.team_repository.check_team_exists(id):
            raise Exception(f"El equipo con id {id} no existe")
        
        # Verificar que el nuevo líder existe
        try:
            self.employee_repo.find_employee_by_id(new_leader_id)
        except Exception as e:
            raise Exception(f"El empleado con ID {new_leader_id} no existe y no puede ser líder del equipo")

        # Verificar que el nuevo líder no es líder de otro equipo
        teams_where_leader = self.team_repository.find_team_where_employee_is_leader([new_leader_id])
        if teams_where_leader:
            raise Exception(f"El empleado con ID {new_leader_id} ya es líder de otro equipo")

        # Verificar que el nuevo líder no pertenece a otro equipo
        leader_employee = self.employee_repo.find_employee_by_id(new_leader_id)
        if leader_employee.equipo is not None and leader_employee.equipo != id:
            raise Exception(f"El empleado con ID {new_leader_id} ya pertenece a otro equipo")

        self.team_repository.update_team_leader(id, new_leader_id)
        return {"message": "Líder del equipo actualizado correctamente"}

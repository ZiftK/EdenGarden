from backend.edensg_server.adapters.repository.supb.team_repository_sb import team_sb_repository as team_repository
from backend.edensg_server.adapters.repository.supb.employee_repository_sb import employee_sb_repository
from backend.edensg_server.domain.entities.team import Team, TeamToCreate
from backend.edensg_server.adapters.repository.supb.team_repository_sb import TeamRepositorySB

class TeamController:
    def __init__(self):
        self.team_repository = TeamRepositorySB()
        self.employee_repo = employee_sb_repository
        
    def get_all_teams(self) -> list[Team]:
        """Obtiene todos los equipos."""
        try:
            return self.team_repository.get_all_teams()
        except Exception as e:
            raise Exception(f"Error al obtener los equipos: {str(e)}")
    
    def get_team_by_id(self, id: int) -> Team:
        return self.team_repository.find_team_by_id(id)
    
    def get_team_by_name(self, name: str) -> list[Team]:
        return self.team_repository.find_team_by_name(name)
    
    def create_team(self, team: TeamToCreate) -> dict:
        """Crea un nuevo equipo."""
        try:
            # Verificar que el líder exista y sea un líder
            leader = self.team_repository.employee_repo.find_employee_by_id(team.lider_id)
            if leader.rol != 'lider':
                raise Exception("El empleado seleccionado no es un líder")

            # Si hay empleados, verificar que existan y no estén en otros equipos
            if team.empleados_ids:
                non_existent = self.team_repository.check_employee_exists(team.empleados_ids)
                if non_existent:
                    raise Exception(f"Los siguientes empleados no existen: {', '.join(map(str, non_existent))}")
                
                in_other_teams = self.team_repository.check_employee_is_in_other_teams(team.empleados_ids)
                if in_other_teams:
                    raise Exception(f"Los siguientes empleados ya están en otros equipos: {', '.join(map(str, in_other_teams))}")

            # Crear el equipo
            team_id = self.team_repository.create_team(team)
            return {"message": "Equipo creado correctamente", "team_id": team_id}
        except Exception as e:
            raise Exception(f"Error al crear el equipo: {str(e)}")
    
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

    def register_team_employees(self, id: int, employee_ids: list[int]) -> dict:
        """Registra los empleados de un equipo."""
        try:
            # Verificar que el equipo existe
            if not self.team_repository.check_team_exists(id):
                raise Exception(f"El equipo con id {id} no existe")
            
            # Verificar que los empleados existan
            non_existent = self.team_repository.check_employee_exists(employee_ids)
            if non_existent:
                raise Exception(f"Los siguientes empleados no existen: {', '.join(map(str, non_existent))}")
            
            # Verificar que los empleados no pertenezcan a ningún equipo
            in_other_teams = self.team_repository.check_employee_is_in_other_teams(employee_ids)
            if in_other_teams:
                raise Exception(f"Los siguientes empleados ya están en otros equipos: {', '.join(map(str, in_other_teams))}")
            
            # Verificar que ninguno sea líder de otro equipo
            teams_where_leader = self.team_repository.find_team_where_employee_is_leader(employee_ids)
            if teams_where_leader:
                leader_ids = [team['fk_lider'] for team in teams_where_leader]
                raise Exception(f"Los siguientes empleados son líderes de otros equipos: {', '.join(map(str, leader_ids))}")
            
            # Registrar los empleados
            self.team_repository.register_team_employees(id, employee_ids)
            return {"message": "Empleados registrados correctamente"}
        except Exception as e:
            raise Exception(str(e))

    def unregister_team_employees(self, team_id: int, employee_ids: list[int]) -> dict:
        """
        Elimina varios empleados de un equipo.
        """
        try:
            # Check if employees exist
            non_existent = self.team_repository.check_employee_exists(employee_ids)
            if non_existent:
                raise Exception(f"Los siguientes empleados no existen: {', '.join(map(str, non_existent))}")
            
            # Check if employees are in the team
            team = self.team_repository.find_team_by_id(team_id)
            current_members = [emp.id_empleado for emp in team.empleados]
            
            for emp_id in employee_ids:
                if emp_id not in current_members:
                    raise Exception(f"El empleado {emp_id} no está en el equipo")
            
            # Remove employees
            self.team_repository.unregister_team_employees(team_id, employee_ids)
            return {"message": "Empleados eliminados exitosamente"}
        except Exception as e:
            raise Exception(f"Error al eliminar empleados: {str(e)}")

    def remove_team_member(self, team_id: int, member_id: int) -> dict:
        """
        Elimina un miembro individual de un equipo.
        
        Args:
            team_id (int): ID del equipo
            member_id (int): ID del miembro a eliminar
        
        Returns:
            dict: Mensaje de éxito
        """
        try:
            # Check if employee exists
            if not self.team_repository.employee_repo.find_employee_by_id(member_id):
                raise Exception(f"El empleado {member_id} no existe")
            
            # Check if employee is in team
            team = self.team_repository.find_team_by_id(team_id)
            current_members = [emp.id_empleado for emp in team.empleados]
            if member_id not in current_members:
                raise Exception(f"El empleado {member_id} no está en el equipo")
            
            # Remove member
            self.team_repository.unregister_team_employees(team_id, [member_id])
            return {"message": "Miembro eliminado exitosamente"}
        except Exception as e:
            raise Exception(f"Error al eliminar el miembro: {str(e)}")

    def update_team_name(self, id: int, new_name: str) -> dict:
        """Actualiza el nombre de un equipo."""
        # Verificar que el equipo existe
        if not self.team_repository.check_team_exists(id):
            raise Exception(f"El equipo con id {id} no existe")
        
        self.team_repository.update_team_name(id, new_name)
        return {"message": "Nombre del equipo actualizado correctamente"}

    def update_team_leader(self, id: int, new_leader_id: int) -> dict:
        """Actualiza el líder de un equipo."""
        try:
            # Verificar que el equipo existe
            team = self.team_repository.find_team_by_id(id)
            
            # Verificar que el nuevo líder existe y es un líder
            leader_employee = self.team_repository.employee_repo.find_employee_by_id(new_leader_id)
            if leader_employee.rol != 'lider':
                raise Exception(f"El empleado con ID {new_leader_id} no es un líder")
        except Exception as e:
            raise Exception(f"El empleado con ID {new_leader_id} no existe y no puede ser líder del equipo")

        # Verificar que el nuevo líder no es líder de otro equipo
        teams_where_leader = self.team_repository.find_team_where_employee_is_leader([new_leader_id])
        if teams_where_leader:
            for team in teams_where_leader:
                if team['id_equipo'] != id:  # Si es líder de otro equipo que no es este
                    raise Exception(f"El empleado con ID {new_leader_id} ya es líder de otro equipo")

        # Verificar que el nuevo líder no pertenece a otro equipo
        if leader_employee.fk_equipo is not None and leader_employee.fk_equipo != id:
            raise Exception(f"El empleado con ID {new_leader_id} ya pertenece a otro equipo")

        self.team_repository.update_team_leader(id, new_leader_id)
        return {"message": "Líder del equipo actualizado correctamente"}

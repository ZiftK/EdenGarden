from backend.edensg_server.adapters.repository.interface.team_repository_interface import TeamRepository
from backend.edensg_server.adapters.repository.supb.client import supabase_client
from backend.edensg_server.domain.entities.team import Team
import asyncio
from supabase import Client


class TeamRepositorySB(TeamRepository):
    def __init__(self):
        self.client: Client = supabase_client
        self.table = 'equipo'
        self.equipoempleado_table = 'equipoempleado'
        self.empleado_table = 'empleado'

    async def create_team(self, team: Team) -> None:
        try:
            data = {
                "id_equipo": team.id_equipo,
                "nombre": team.nombre,
                "descripcion": team.descripcion,
                "fecha_creacion": team.fecha_creacion,
                "estado": team.estado
            }
            self.client.table(self.table).insert(data).execute()
        except Exception as e:
            print(f"Error al crear equipo: {str(e)}")
            raise

    async def find_team(self, search_value: str, search_by: str = "id") -> list[Team]:
        try:
            print(f"Buscando equipo con valor: {search_value}, tipo: {search_by}")
            query = self.client.table(self.table).select("*")
            
            if search_by == "id":
                print(f"Buscando por id_equipo: {search_value}")
                query = query.eq("id_equipo", search_value)
            elif search_by == "name":
                print(f"Buscando por nombre: {search_value}")
                query = query.eq("nombre", search_value)
            elif search_by == "all":
                print("Buscando todos los equipos")
                pass  # No se aplica filtro
            
            print("Ejecutando consulta...")
            response = query.execute()
            print(f"Respuesta recibida: {response}")
            
            teams = []
            for team_data in response.data:
                print(f"Procesando equipo: {team_data}")
                empleados = self._get_empleados_completos_by_equipo(team_data["id_equipo"])
                team = Team(
                    id_equipo=team_data["id_equipo"],
                    nombre=team_data["nombre"],
                    descripcion=team_data.get("descripcion", ""),
                    fecha_creacion=team_data.get("fecha_creacion", None),
                    estado=team_data.get("estado", "activo"),
                    empleados=empleados,
                    lider=self._get_lider_by_equipo(team_data["id_equipo"])
                )
                teams.append(team)
            
            print(f"Equipos encontrados: {len(teams)}")
            return teams
        except Exception as e:
            print(f"Error al buscar equipo: {str(e)}")
            print(f"Tipo de error: {type(e)}")
            import traceback
            print(f"Traceback: {traceback.format_exc()}")
            return []

    def _get_empleados_completos_by_equipo(self, id_equipo):
        try:
            # Obtener los IDs de empleados
            response = self.client.table(self.equipoempleado_table).select("fk_empleado").eq("fk_equipo", id_equipo).execute()
            print(f"Respuesta de equipoempleado: {response}")
            ids = [row["fk_empleado"] for row in response.data]
            if not ids:
                return []
            # Obtener los datos completos de los empleados
            empleados_resp = self.client.table(self.empleado_table).select("*").in_("id_empleado", ids).execute()
            print(f"Respuesta de empleado: {empleados_resp}")
            return empleados_resp.data
        except Exception as e:
            print(f"Error al obtener empleados completos del equipo {id_equipo}: {str(e)}")
            return []
        
    def _get_lider_by_equipo(self, id_equipo):
        try:
            response = self.client.table(self.equipoempleado_table).select("fk_empleado").eq("fk_equipo", id_equipo).eq("rol", "lider").execute()
            print(f"Respuesta de lider: {response}")
            return response.data[0]["fk_empleado"]
        except Exception as e:
            print(f"Error al obtener lider del equipo {id_equipo}: {str(e)}")
            return None

    async def update_team_data(self, team_id: str, team: Team) -> None:
        try:
            data = {
                "nombre": team.nombre,
                "descripcion": team.descripcion,
                "estado": team.estado
            }
            self.client.table(self.table).update(data).eq("id_equipo", team_id).execute()
        except Exception as e:
            print(f"Error al actualizar equipo: {str(e)}")
            raise

    async def drop_team_data(self, team_id: str) -> None:
        try:
            self.client.table(self.table).delete().eq("id_equipo", team_id).execute()
        except Exception as e:
            print(f"Error al eliminar equipo: {str(e)}")
            raise

    async def get_all_teams(self) -> list[Team]:
        try:
            response = self.client.table(self.table).select("*").execute()
            teams = []
            for team_data in response.data:
                empleados = self._get_empleados_completos_by_equipo(team_data["id_equipo"])
                team = Team(
                    id_equipo=team_data["id_equipo"],
                    nombre=team_data["nombre"],
                    descripcion=team_data.get("descripcion", ""),
                    fecha_creacion=team_data.get("fecha_creacion", None),
                    estado=team_data.get("estado", "activo"),
                    empleados=empleados,
                    lider= self._get_lider_by_equipo(team_data["id_equipo"])
                )
                teams.append(team)
            return teams
        except Exception as e:
            print(f"Error al obtener todos los equipos: {str(e)}")
            return []

    async def test_connection(self) -> bool:
        try:
            response = self.client.table(self.table).select("*").execute()
            print("Conexión exitosa:", response)
            return True
        except Exception as e:
            print("Error de conexión:", str(e))
            return False


repository_sb = TeamRepositorySB()

async def main():
    repo = TeamRepositorySB()
    print(await repo.test_connection())

if __name__ == "__main__":
    asyncio.run(main())

import { Employee, ShortTeam } from "@/src/shared/types"

export interface dataTeam  {
    isEditing : boolean
    currentTeam: ShortTeam
    teamShowed: ShortTeam
    teamChanged?: ShortTeam
}

export interface TeamMemberRowProps {
	user: Pick<Employee, 'email' | 'id_empleado' | 'nombre' | 'telefono' | 'rol' | 'puesto' | 'salario' | 'img' >
	index: number
	isEditing: boolean
	isIncluded: boolean
	onToggle: (checked: boolean) => void
	onDelete?: () => void
}

export interface TeamsState {
	teams: ShortTeam[]
	loading: boolean
	error: string | null
	setTeams: (teams: ShortTeam[]) => void
	fetchTeams: () => Promise<void>
	addTeam: (team: ShortTeam) => Promise<void>
	removeTeam: (teamId: string) => Promise<void>
}
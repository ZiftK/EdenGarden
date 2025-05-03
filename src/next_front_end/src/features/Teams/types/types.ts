import { ShortTeam } from "@/src/shared/types"

export interface dataTeam  {
    isEditing : boolean
    currentTeam: ShortTeam
    teamShowed: ShortTeam
    teamChanged?: ShortTeam
}
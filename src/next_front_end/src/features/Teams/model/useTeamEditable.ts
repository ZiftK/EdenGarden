'use client'

import { useState } from "react"

import { ShortTeam } from "@/src/shared/types"
import { handleSaveTeam } from "../handlers/handleSaveTeam"
import { handleToggleRemove } from "../handlers/handleToggleRemove"
import { dataTeam } from "../types/types"

export function useEditableTeam({initialTeam, isNewTeam = false}:{initialTeam: ShortTeam, isNewTeam?: boolean}) {
  const defaultTeam = {		
      id: '',
      name: '',
      leader: {
        name: '',
        id: '',
        email: '',
        phone_number: '',
        role: "leader" as 'leader',
        position: '',
        salary: 0,
      },
      members: [],}

  const [data, setData] = useState<dataTeam>({
    currentTeam: initialTeam,
    isEditing: isNewTeam,
    teamShowed: initialTeam,
    teamChanged: defaultTeam
  })

  const reset = () => {
    setData((prev) => ({
      ...prev,
      isEditing: false,
      teamShowed: prev.currentTeam,
      teamChanged: defaultTeam,
    }))
  }

  const handleSave = () => {
    handleSaveTeam(data, setData, reset)
  }

  const handleRemove = () => {
    if(data.teamChanged?.members.length === 0) return
    const updated = handleToggleRemove(data)
    setData(updated)
  }

  const handleAddMember = () => {
    // Implementar agregar miembro
  }

  return {
    data,
    setData,
    reset,
    handleSave,
    handleToggleRemove: handleRemove,
    handleAddMember,
  }
}

'use client'

import { useState } from "react"

import { ShortTeam } from "@/src/shared/types"
import { handleSaveTeam } from "../handlers/handleSaveTeam"
import { handleToggleRemove } from "../handlers/handleToggleRemove"
import { dataTeam } from "../types/types"

export function useEditableTeam({initialTeam, isNewTeam = false}:{initialTeam: ShortTeam, isNewTeam?: boolean}) {
  const [data, setData] = useState<dataTeam>({
    currentTeam: initialTeam,
    isEditing: isNewTeam,
    teamShowed: initialTeam,
    teamChanged: {		name: '',
      leader: {
        name: '',
        id: '',
        email: '',
        phone_number: '',
        role: 'leader',
        position: '',
        salary: 0,
      },
      members: [],},
  })

  const reset = () => {
    alert('se activo el reset')
    setData((prev) => ({
      ...prev,
      isEditing: true,
      teamShowed: data.currentTeam,
      teamChanged: {
        name: '',
        leader: {
          name: '',
          id: '',
          email: '',
          phone_number: '',
          role: 'leader',
          position: '',
          salary: 0,
        },
        members: [],
      },
      currentTeam: data.currentTeam
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

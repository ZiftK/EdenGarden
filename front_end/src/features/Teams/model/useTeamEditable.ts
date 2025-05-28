'use client'

import { useState } from "react"

import { ShortTeam } from "@/src/shared/types"
import { handleSaveTeam } from "../handlers/handleSaveTeam"
import { handleToggleRemove } from "../handlers/handleToggleRemove"
import { dataTeam } from "../types/types"

export function useEditableTeam({initialTeam, isNewTeam = false}:{initialTeam: ShortTeam, isNewTeam?: boolean}) {
  const defaultTeam: ShortTeam = {		
      id_equipo: 0,
      nombre: '',
      lider: {
        nombre: '',
        id_empleado: 0,
        email: '',
        telefono: '',
        rol: "lider",
        puesto: '',
        salario: 0,
        img: null
      },
      empleados: [],
    }

  const [data, setData] = useState<dataTeam>({
    currentTeam: initialTeam,
    isEditing: isNewTeam,
    teamShowed: initialTeam,
    teamChanged: isNewTeam ? defaultTeam : initialTeam
  })

  const reset = () => {
    setData((prev) => ({
      ...prev,
      isEditing: false,
      teamShowed: prev.currentTeam,
      teamChanged: prev.currentTeam,
    }))
  }

  const handleSave = () => {
    handleSaveTeam(data, setData, reset)
  }

  const handleRemove = () => {
    if(data.teamChanged?.empleados?.length === 0) return
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

'use client'

import { useRef, useEffect, useState } from "react"

import { ShortTeam } from "@/src/shared/types"
import { handleSaveTeam } from "./handlers/handleSaveTeam"
import { handleToggleRemove } from "./handlers/handleToggleRemove"
import { dataTeam } from "../types/types"

export function useEditableTeam(initialTeam: ShortTeam) {
  const [data, setData] = useState<dataTeam>({
    currentTeam: initialTeam,
    isEditing: false,
    teamShowed: initialTeam,
    teamChanged: [],
  })

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (data.isEditing && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [data.isEditing])

  const reset = () => {
    setData((prev) => ({
      ...prev,
      isEditing: false,
      teamShowed: prev.currentTeam,
      teamChanged: [],
    }))
  }

  const handleSave = () => {
    handleSaveTeam(data, setData, reset)
  }

  const handleRemove = () => {
    const updated = handleToggleRemove(data)
    setData(updated)
  }

  const handleAddMember = () => {
    // Implementar agregar miembro
  }

  return {
    data,
    setData,
    bottomRef,
    reset,
    handleSave,
    handleToggleRemove: handleRemove,
    handleAddMember,
  }
}

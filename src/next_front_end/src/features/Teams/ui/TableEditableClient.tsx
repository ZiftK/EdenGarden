'use client'

import { EmailIcon, PhoneIcon } from "@/src/components/landing/atoms/Icons/Icons"
import { ShortTeam } from "@/src/shared/types"
import CopyButton from "@/src/components/ERP/atoms/CopyButton"
import { useEditableTeam } from "../model/useTeamEditable"

export default function TableEditable({ team }: { team: ShortTeam }) {
  const {
    data,
    setData,
    bottomRef,
    reset,
    handleSave,
    handleToggleRemove,
    handleAddMember,
  } = useEditableTeam(team)

  return (
    <>
      <div className="w-full font-light text-sm overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] min-w-[450px] text-center py-2 mb-2 font-medium border-b border-[#bec8a6]">
          <span>Puesto</span>
          <span>Expediente</span>
          <span>Nombre</span>
          <span>Contacto</span>
          {data.isEditing ? (
            <button onClick={handleToggleRemove} className="text-blue-500 cursor-pointer border-b-2 w-fit m-auto">
              Eliminar
            </button>
          ) : (
            <span>Salario</span>
          )}
        </div>

        {/* Body */}
        <div ref={bottomRef} className="divide-y min-w-[450px] divide-[#2b2f22] h-[100px] overflow-y-auto text-xs scrollbar-thin-custom xl:h-48">
          {data.teamShowed.members.map((user, i) => (
            <div key={user.id} className={`grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center text-center py-2 ${i % 2 === 0 ? "bg-transparent" : "bg-[var(--father-font-transparent-200)]"}`}>
              <span>{user.position}</span>
              <span>{user.id}</span>
              <span>{user.name}</span>
              <div className="flex items-center justify-center gap-2">
                <CopyButton text={user.email} icon={EmailIcon({ color: "var(--father-font)", size: [0.75, 0.75] })} />
                <CopyButton text={user.phone_number} icon={PhoneIcon({ color: "var(--father-font)", size: [0.75, 0.75] })} />
              </div>
              {data.isEditing ? (
                <input
                  type="checkbox"
                  checked={data.teamChanged!.includes(user)}
                  className="accent-[var(--father-font)] cursor-pointer"
                  onChange={(e) => {
                    const checked = e.target.checked
                    const newTeam = data.teamChanged || []
                    setData({
                      ...data,
                      teamChanged: checked
                        ? [...newTeam, user]
                        : newTeam.filter((u) => u !== user),
                    })
                  }}
                />
              ) : (
                <span>{user.salary}</span>
              )}
            </div>
          ))}
          {data.isEditing && (
            <button onClick={handleAddMember} className="w-full py-4 text-sm cursor-pointer">
              Agregar +
            </button>
          )}
        </div>
      </div>

      {!data.isEditing && (
        <button onClick={() => setData({ ...data, isEditing: true })} className="cursor-pointer text-[var(--green-dark-500)] border-b-2 text-md place-self-end text-center">
          Editar
        </button>
      )}

      {data.isEditing && (
        <div className="flex gap-2 justify-end mt-4">
          <button onClick={handleSave} className="cursor-pointer text-md">
            Guardar
          </button>
          <button onClick={reset} className="cursor-pointer text-md">
            Cancelar
          </button>
        </div>
      )}
    </>
  )
}
